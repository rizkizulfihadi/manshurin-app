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

        // check if otp exists
        const otpExists = await db.otp.findFirst({
            where: {
                userId: user.id,
            },
            orderBy: { createdAt: "desc" }
        })

        if(!otpExists){
            return NextResponse.json(
                {
                    status: "error",
                    message: "OTP tidak ditemukan"
                }
            )
        }

        // verifikasi otp 
        const isValid = verifyOtp(otp)

        if(!isValid){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Kode OTP Salah atau kadaluarsa"
                },
                { status: 400 }
            )
        }

        // delete otp in database
        await db.otp.deleteMany({
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

        return NextResponse.json(
            {
                status: "success",
                message: "OTP Berhasil di verifikasi "
            }
        )

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