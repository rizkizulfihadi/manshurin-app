import crypto from "crypto"

export const generateOtp = () => {
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashOtp = crypto.createHash("sha256").update(otp).digest("hex"); 
    return { code: otp, hashOtp };
}

export const verifyOtp = (otp: string, hashedOtp: string): boolean => {
    return crypto.createHash("sha256").update(otp).digest("hex") === hashedOtp;
};