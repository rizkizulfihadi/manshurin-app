import { z } from "zod";

const regexPassword = /^(?=.*[A-Za-z])(?=.*\d).+$/;

export const LoginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .min(8,  "Password minimal 8 karakter" )
    .max(32, "Password maksimal 32 karakter" )
    .regex(regexPassword, "Password harus mengandung setidaknya satu huruf dan satu angka")
});

export const RegisterSchema = z.object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z
    .string()
    .min(8,  "Password minimal 8 karakter" )
    .max(32, "Password maksimal 32 karakter" )
    .regex(regexPassword, "Password harus mengandung setidaknya satu huruf dan satu angka"),
    confirmPassword: z
    .string()
    .min(1, "Konfirmasi password diperlukan")
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password tidak sama"
})

export const OtpVerifySchema = z.object({
    otp: z
    .string()
    .min(6, "OTP harus 6 karakter")
    .max(6, "OTP harus 6 karakter"),
    email: z
    .string().email("Email tidak valid"),
})

export const EmailSchema = z.object({
  email: z.string().email("Email tidak valid"),
})
  

export const ResetPasswordSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8,  "Password minimal 8 karakter" )
    .max(32, "Password maksimal 32 karakter" )
    .regex(regexPassword, "Password harus mengandung setidaknya satu huruf dan satu angka"),
    confirmPassword: z
    .string()
    .min(1, "Konfirmasi password diperlukan")
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password tidak sama"
})