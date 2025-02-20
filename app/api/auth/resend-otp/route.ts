import { db } from "@/lib/db"
import { sendOtp } from "@/lib/mailer";
import { generateOtp } from "@/lib/otp";
import { NextRequest, NextResponse } from "next/server"

const OTP_EXPIRATION = 5 * 60 * 1000; 

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

        // check if otp is active
        const lastOtp = await db.otp.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" }
        })

        if(lastOtp){
            const now = new Date()
            const otpCreated = new Date(lastOtp.createdAt)
            const isOtpValid = now.getTime() - otpCreated.getTime() < OTP_EXPIRATION;

            if(isOtpValid){
                return NextResponse.json(
                    {
                        status : "error",
                        message: "OTP masih aktif silahkan gunakan otp yang sudah dikirim"
                    }, { status: 400 }
                )
            }
        }

        const otp = generateOtp()
        const saveOtp = await db.otp.create({
            data: {
                code: otp,
                userId: user.id
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

        sendOtp(email, otp)

        return NextResponse.json(
            {
                status: "success",
                message: "Otp berhasil dikirimkan silahkan cek email anda",
                data: { otp }
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