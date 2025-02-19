import { totp } from "otplib"

const SECRET_KEY = process.env.OTP_SECRET as string
totp.options = { digits: 6, step: 300 }

export const generateOtp = () => {
    return totp.generate(SECRET_KEY)
}

export const verifyOtp = (token: string): boolean => {
    return totp.verify({  token, secret: SECRET_KEY })
}

