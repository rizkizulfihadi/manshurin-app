import { db } from "@/lib/db";
import { EmailSchema } from "@/schema/auth";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto"
import { sendResetEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
    try {

        // parsing data from request
        const body = await req.json()
        const parsedData = EmailSchema.safeParse(body)

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
        const { email } = parsedData.data

        // check if user exists
        const user = await db.user.findUnique({
            where: { email }
        })
        
        if(!user){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Email tidak ditemukan"
                }, { status: 404 }
            )
        }

        // create token for reset password
        const token = randomBytes(16).toString("hex")
        const expiredToken = new Date(Date.now() + 15 * 60 * 1000)
        const now = new Date()

        const resetRequest = await db.passwordResetRequest.findUnique({
            where: {email}
        })
        
        let createResetToken;
        
        // check if user has already requested reset password or request has exceeded the limit
        if(resetRequest){
            const expiredData = new Date(resetRequest.expiresAt)
            const timeDifference = now.getTime() - expiredData.getTime()
            const oneDayMs = 25 * 60 * 60 * 1000;

        if(now < expiredData){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Permintaan reset masih berlaku, cek kembali email anda"
                },
                {
                    status: 400
                }
            )
        }

        if(timeDifference >= oneDayMs){
            await db.passwordResetRequest.update({
                where: { id: user.id },
                data: { requestCount: 0 }
            })
        }

        if(resetRequest.requestCount >= 3){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Reset password melebihi batas, coba lagi besok"
                },
                { status: 429 }
            )
        }

        createResetToken = await db.passwordResetRequest.update({
            where: {userId: user.id},
            data: {
                token,
                expiresAt: expiredToken,
                requestCount: { increment: 1 }
            }
        })
        }else{
            createResetToken = await db.passwordResetRequest.create({
                data: {
                    token,
                    expiresAt: expiredToken,
                    email,
                    requestCount: 1,
                    userId: user.id
                }
                
            })
        }

        if(!createResetToken){
            return NextResponse.json(
                {
                    status: "error",
                    message: "gagal memuat permintaan reset password",
                },
                { status: 500 }
            )
        }

        const sentResetPassword = await sendResetEmail(email, token)
        if(!sentResetPassword){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Gagal mengirimkan email reset password",
                },
                { status: 500 }
            )
        }

        return NextResponse.json(
            {
                status: "success",
                message: "Permintaan reset password berhasil dikirimkan, silahkan cek email anda",
                data: {email}
            },
            {status: 200}
        )

    } catch (error) {
        console.error("Error reset password request: ", error)
        return NextResponse.json(
            {
                status: "error",
                message: "Terjadi kesalahan pada server. Coba lagi nanti."
            }, { status: 500 }
        )
    }
}