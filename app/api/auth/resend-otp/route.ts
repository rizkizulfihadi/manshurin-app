import { db } from "@/lib/db"
import { sendOtp } from "@/lib/mailer";
import { generateOtp } from "@/lib/otp";
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest){
    try {

        // check email is exists
        const { email } = await req.json()
        if(!email){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Email diperlukan"
                }, { status: 400 }
            )
        }

        // check if user exists
        const user = await db.user.findUnique({
            where: {email}
        })

        if(!user){
            return NextResponse.json(
                {
                    status: "error",
                    message: "User tidak ditemukan"
                }, { status: 404 }
            )
        }

        // check if user has verified 
        if(user.otpVerified === true){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Unauthorized" 
                }, { status: 401 }
            )
        }

        const existingOtp = await db.otp.findUnique({
            where: { userId: user.id }
        })
        // check if not existing otp 
        if(!existingOtp){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Unauthorized",
                }, { status: 401 }
            )
        }

        // get time now and time when otp created
        const now = new Date()
        const otpCreated = new Date(existingOtp.createdAt)

        // count different time 
        const timeDiff = now.getTime() - otpCreated.getTime();
        const oneDay = 25 * 60 * 60 * 1000 // one day

        let newRequestCount = existingOtp.requestCount + 1

        // if request count more then 1 day reset 
        if(timeDiff > oneDay){
            newRequestCount = 1
        }else if(existingOtp.requestCount >= 5){
            return NextResponse.json(
                {
                    status: "error",
                    message: "batas resend otp sudah habis, coba lagi besok"
                }, { status: 429 }
            )
        }

        // create otp 
        const otp = generateOtp()
        const saveOtp = await db.otp.update({
            where: {
                userId: user.id
            },
            data: {
                code: otp.hashOtp,
                requestCount: newRequestCount,
                createdAt: now
            }
        })

        if(!saveOtp){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Gagal mengirim OTP, coba lagi nanti"
                }, { status: 500 }
            )
        }

        sendOtp(email, otp.code)

        return NextResponse.json(
            {
                status: "success",
                message: "Otp berhasil dikirimkan silahkan cek email anda",
                data: { countTimer: saveOtp.requestCount }
            }, { status: 200 }
        )

        
    } catch (error) {
        console.error("Error resend otp : ", error)
        return NextResponse.json(
            {
                status: "error",
                message: "error saat melakukan resend otp"
            }, { status: 500 }
        )
    }
}