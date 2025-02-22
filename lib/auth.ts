import { User } from "@prisma/client"
import jwt from "jsonwebtoken"
import { nanoid } from "nanoid";
import { hash, compare } from "bcrypt-ts"
import { db } from "@/lib/db"
import { NextResponse } from "next/server";

const ACCESS_SECRET = process.env.ACCESS_SECRET as string
const REFRESH_SECRET = process.env.REFRESH_SECRET as string

// durasi token
const ACCESS_TOKEN_EXPIRY =  60 * 60; // 1 hour 
const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 7 // 1 week


// access token
export const createToken = (user: User) => {
    return jwt.sign( {userId: user.id }, ACCESS_SECRET)
}

// refresh token
export const createRefreshToken = (user: User) => {
    return jwt.sign( {userId: user.id}, REFRESH_SECRET)
}

// validation access token
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, ACCESS_SECRET) as { userId: string }
    } catch (error) {
        return null
    }
}

// validation refresh token 
export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_SECRET) as { userId: string }
    } catch (error) {
        return null
    }
}

// generate username
export const generateUsername = async(email: string) =>{
    const username = email.split("@")[0];
    const usernameExists = await db.user.findUnique({
        where: {
            username: username
        }
    })
    if (usernameExists) {
        return username + nanoid().substring(0, 5);
      }
    
      return username;
}

// hash password 
export const hashPassword = async (password: string): Promise<string> => {
    return await hash(password, 10)
}

// validation password
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await compare(password, hashedPassword)
}

// set cookies
export const setAuthCookies = (response: NextResponse, token: string, refreshToken: string) => {
    response.cookies.set("SESSION_ID", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: ACCESS_TOKEN_EXPIRY,
        path: "/"
    })

    response.cookies.set("SESSION_REFRESH", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: REFRESH_TOKEN_EXPIRY,
        path: "/"
    })
}

// get time resend otp 
export const getTimeResend = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email
        }
    })

    const otp = await db.otp.findUnique({
        where: { userId: user?.id }
    })

    const timeResend = otp?.requestCount 

    if(timeResend === 0 ){
        return 60   
    }else{
        return timeResend!! *  5 * 60 
    }
}
