import { User } from "@prisma/client"
import jwt from "jsonwebtoken"
import { nanoid } from "nanoid";
import { hash, compare } from "bcrypt-ts"
import { db } from "@/lib/db"

const ACCESS_SECRET = process.env.ACCESS_SECRET as string
const REFRESH_SECRET = process.env.REFRESH_SECRET as string

// durasi token
const ACCESS_TOKEN_EXPIRY = "1h"; 
const REFRESH_TOKEN_EXPIRY = "7d";


// access token
export const createToken = (user: User) => {
    return jwt.sign({
        userId: user.id,
 
    }, ACCESS_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRY})
}

// refresh token
export const createRefreshToken = (user: User) => {
    return jwt.sign(
        {userId: user.id},
        REFRESH_SECRET, 
        { expiresIn: REFRESH_TOKEN_EXPIRY }
    )
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
