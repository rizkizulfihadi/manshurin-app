import { RegisterSchema } from "@/schema/auth";
import { generateUsername, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    try {

        // parsing data from request
        const body = await req.json()
        const parsedData = RegisterSchema.safeParse(body)
        
        if(!parsedData.success) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "data tidak valid",
                    errors: parsedData.error
                },
                {status: 400}
            )
        }

        // destructuring data has validated
        const { name, email, password } = parsedData.data

        // check if user already exists
        const existingUser = await db.user.findUnique({
            where: {email}
        })

        if(existingUser){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Email anda sudah terdaftar"
                },
                { status: 400 }
            )
        }

        // generate username & hashind password
        const username = await generateUsername(email)
        const hashedPassword = await hashPassword(password)

        // create new user
        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                picture: `https://api.dicebear.com/9.x/initials/svg?seed=${name}`
            }
        })

        if(!newUser){
            return NextResponse.json(
                {
                    status: "error",
                    message: "Gagal mendaftar akun. Silahkan coba lagi"
                },
                { status: 500 }
            )
        }

        // create personal info
        const newPersonalInfo = await db.personalInfo.create({
            data: {
                fullName: name,
                userId: newUser.id
            }
        })

        if(!newPersonalInfo) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "Gagal menyimpan informasi pengguna. silahkan coba lagi."
                },
                { status: 500 }
            )
        }

        return NextResponse.json(
            {
                status: "success",
                message: "Registrasi berhasil!"
            },
            { status: 200 }
        )
     
    } catch (error) {
        console.error("Error saat registrasi", error)
        return NextResponse.json(
            {
                status: "error",
                message: "Terjadi kesalahan pada server. Silahkan coba lagi nanti",
                error
            },
            { status: 500 }
        )   
    }
}