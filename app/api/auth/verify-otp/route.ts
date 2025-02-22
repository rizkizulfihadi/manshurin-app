import { createRefreshToken, createToken, setAuthCookies } from "@/lib/auth";
import { db } from "@/lib/db";
import { verifyOtp } from "@/lib/otp";
import { OtpVerifySchema } from "@/schema/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        // parsing data from request
        const body = await req.json()
        const parsedData = OtpVerifySchema.safeParse(body)

        if(!parsedData.success){
            return NextResponse.json(
                { 
                    status: "error",
                    message: "Data tidak valid",
                    error: parsedData.error
                }, { status: 400 }
            )
        }

        // destructuring data has validated
        const { email, otp } = parsedData.data

        // check if use exists
        const user = await db.user.findUnique({
            where: {email}
        })

        if(!user) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "User tidak ditemukan",
                }, { status: 404 }
            )
        }

        // check if user has verified otp
        if(user.otpVerified === true){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Unauthorized"
                }, { status: 401 }
            )
        }

        // check if otp exists
        const otpExists = await db.otp.findUnique({
            where: {
                userId: user.id,
            }
        })

        if(!otpExists){
            return NextResponse.json(
                {
                    status: "error",
                    message: "OTP tidak ditemukan"
                }
            )
        }

        // check if otp  expired
        const currentTime = new Date()
        const otpCreatedAt = new Date(otpExists.createdAt)
        const timeDiff = (currentTime.getTime() - otpCreatedAt.getTime()) / 1000;

        if (timeDiff > 300) { 
            await db.otp.delete({
                where: { userId: user.id }
            });

            return NextResponse.json(
                {
                    status: "error",
                    message: "Kode OTP Salah atau kadaluarsa",
                }, { status: 400 }
            );
        }

        // verifikasi otp 
        const isValid = verifyOtp(otp, otpExists.code)

        if(!isValid){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Kode OTP Salah"
                },
                { status: 400 }
            )
        }
        

        // delete otp in database
        await db.otp.delete({
            where: { userId: user.id }
        })

        // update user
        await db.user.update({
            data: {
                otpVerified: true
            },
            where: {
                id: user.id
            }
        })

        const token = createToken(user)
        const refreshToken = createRefreshToken(user)

        const response = NextResponse.json(
            {
                status: "success",
                message: "OTP berhasil diverifikasi",
                data: {
                    token, refreshToken
                }
            }
        )

        setAuthCookies(response, token, refreshToken)

        return response

    } catch (error) {
        console.error("Error saat verifikasi OTP", error)
        return NextResponse.json(
            {
                status: "error",
                message: "Terjadi kesalahan pada server. Coba lagi nanti",
                error
            }, { status: 500 }
        )
    }
}