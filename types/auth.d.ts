export interface LoginForm {
    email: string;
    password: string
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

export interface ResetPasswordForm {
    email: string;
    password: string;
    confirmPassword: string;
}