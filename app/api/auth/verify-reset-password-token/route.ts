import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json()
        
        if(!token){
            return NextResponse.json({ error: "Token tidak ditemukan" }, { status: 400 })
        }

        const resetToken = await db.passwordResetRequest.findUnique({
            where: { token }
        })

        if(!resetToken){
            return NextResponse.json(
                {
                    status: "error", 
                    message: "Token tidak valid"
                },
                {status: 400}
            )
        }else{
            const now = new Date()
            if(now > resetToken.expiresAt){
                return NextResponse.json(
                    {
                        status: "error", 
                        message: "Token kadaluarsa" 
                    },
                    {status: 400}
                )
                }else{
                    return NextResponse.json(
                        {
                            status: "success",
                            message: "Token valid",
                            data: {
                                email: resetToken.email
                            }
                        }
                    )
                }
        }



    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { 
                status: "error",
                message: "Terjadi kesalahan internal, coba lagi nanti"
            },
            { status: 500 }
        );
    }
}