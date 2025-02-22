import { LoginSchema } from "@/schema/auth";
import { createRefreshToken, createToken, setAuthCookies, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendOtp } from "@/lib/mailer";
import { generateOtp } from "@/lib/otp";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    try {

        // parsing data from request
        const body = await req.json()
        const parsedData = LoginSchema.safeParse(body)

        if(!parsedData.success){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Data tidak valid",
                    errors: parsedData.error
                }, { status: 400 }
            )
        }

        // destructuring data has validated
        const { email, password } = parsedData.data

        // check if user exists
        const user = await db.user.findUnique({
            where: { email }
        })

        if(!user){
            return NextResponse.json(
                { 
                    status: "error",
                    message: "Username atau password salah",
                }, { status: 401 }
            )
        }

        // check password is valid
        const isPasswordValid = await verifyPassword(password, user.password)

        if(!isPasswordValid){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Username atau password salah"
                }, { status: 401 }
            )
        }

        if(user.otpVerified === false){

            // if the OTP request has been requested 5 times
            const existingOtp = await db.otp.findUnique({
                where: { userId: user.id }
            })

            if(existingOtp){
                // get time now and time when otp created
                const now = new Date()
                const otpCreated = new Date(existingOtp.createdAt)

                // count different time 
                const timeDiff = now.getTime() - otpCreated.getTime();
                const oneDay = 25 * 60 * 60 * 1000 // one day

                if(timeDiff < oneDay && existingOtp.requestCount >= 5){
                    return NextResponse.json(
                        {
                            status: "error",
                            message: "Terlalu banyak permintaan OTP, coba lagi besok"
                        }, { status: 429 }
                    )
                }
            }

            const otp = generateOtp()
            const saveOtp = await db.otp.upsert({
                where: { userId: user.id },
                update: {
                    code: otp.hashOtp,
                },
                create: {
                    userId: user.id,
                    code: otp.hashOtp
                }
            })

            // save otp in database
            if(!saveOtp){
                return NextResponse.json(
                    {
                        status: "error",
                        message: "Gagal mengirim OTP, coba lagi nanti"
                    }, { status: 500 }
                )
            }
            
            // send otp in email
            sendOtp(email, otp.code)

            // redirect response
            const response =  NextResponse.json(
                {
                    status: "redirect",
                    message: "OTP belum diverifikasi",
                    redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`
                }, { status: 303 }
            )
            
            // save email in cookie
            response.cookies.set("SESSION_AUTH", email, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 5 * 60
            })

            return response;


        }else{
            const token = createToken(user)
            const refreshToken = createRefreshToken(user)

            const response = NextResponse.json(
                {
                    status: "success",
                    message: "Login Berhasil",
                    data : {
                        token, refreshToken
                    }
                }, { status: 200 }
            )
            
            setAuthCookies(response, token, refreshToken)

            return response
        }

    } catch (error) {
        console.error("Error saat resgistrasi : ", error)
        return NextResponse.json(
            { 
                status: "error",
                message: "Terjadi kesalahan pada server. Coba lagi nanti",
                errors: error
            }, { status: 500 }
        )
    }
}