import { hashPassword, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { ResetPasswordSchema } from "@/schema/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest){
    try {

        // parsing data from request
        const body = await req.json()
        const parsedData = ResetPasswordSchema.safeParse(body)

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

        const { email, password, confirmPassword } = parsedData.data

        if(password !== confirmPassword){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Data tidak valid",
                    error: parsedData.error
                }
            )
        }

        // check if user exists
        const user = await db.user.findUnique({
            where: { email }
        })

        if(!user){
            return NextResponse.json(
                {
                    status: "error",
                    message: "user tidak ditemukan"
                }, { status: 404 }
            )
        }

        // check if password same with old password
        const isSamePasswordWithOldPassword = await verifyPassword(password, user.password)

        if(isSamePasswordWithOldPassword){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Kata sandi baru tidak boleh sama dengan kata sandi lama"
                }, { status: 400 }
            )
        }

        const hashedPassword = await hashPassword(password)

        await db.user.update({
            where: { id: user.id },
            data: { password: hashedPassword }
        })

        await db.passwordResetRequest.deleteMany({
            where: { userId: user.id }
        })

        return NextResponse.json(
            {
                status: "success",
                message: "kata sandi berhasil diubah",
                data: user.email
            }, { status: 200 }
        )
        
    } catch (error) {
        console.error("Error reset password : ", error)
        return NextResponse.json(
            {
                status: "error",
                message: "Gagal mereset password",
                error
            }, { status: 500 }
        )
    }
}