"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-request`,
        {
          method: "POST",
          headers: {
            "Contect-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Koneksi internet tidak stabil atau bermasalah!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center  py-12 px-4 ">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Lupa Kata Sandi?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Masukkan alamat email yang terdaftar di akun Anda, dan kami akan
            mengirimkan tautan untuk mereset kata sandi Anda.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Alamat email"
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Loading..." : "Kirim Tautan Reset"}
          </Button>
        </form>
        <div className="flex justify-center">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            Kembali ke halaman login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
