import nodemailer from "nodemailer"

// mailer function ===>
export const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
});


export const sendOtp = async (email: string, otp: string) => {
    const mailOptions = {
        from : process.env.EMAIL_USER,
        to: email,
        subject: "OTP Verification",
        html: 
        `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="text-align: center; color: #333;">Verifikasi OTP Anda</h2>
            <p style="text-align: center; font-size: 16px; color: #555;">
            Gunakan kode OTP berikut untuk memverifikasi akun Anda:
            </p>
            <div style="text-align: center; font-size: 24px; font-weight: bold; color: #007bff; padding: 10px; border-radius: 8px; background-color: #f4f4f4; display: inline-block; margin: 10px auto;">
            ${otp}
            </div>
            <p style="text-align: center; font-size: 14px; color: #777;">
            Kode ini berlaku selama <strong>5 menit</strong>. Jangan berikan kode ini kepada siapapun.
            </p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            <p style="text-align: center; font-size: 12px; color: #999;">
            Jika Anda tidak meminta kode ini, silakan abaikan email ini.
            </p>
        </div>`
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log(`OTP dikirim ke email ${email}`)
        return true
    } catch (error) {
        console.error("Gagal mengirim OTP : ", error)
        return false
    }
}


export const sendResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/auth/new-password?token=${token}`
    const mailOptions = {
        from : process.env.EMAIL_USER,
        to: email,
        subject: "Reset Password",
        html: `<p>Klik link berikut untuk mereset password Anda:</p>
             <a href="${resetLink}">Klik disini untuk reset password</a>
             <p>Link ini hanya berlaku selama 15 menit.</p>`,
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log(`link reset password berhasil dikirim ke email ${email}`)
        return true
    } catch (error) {
        console.error("Gagal mengirim link reset password : ", error)
        return false
    }
}