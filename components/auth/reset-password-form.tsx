"use client";

import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { ResetPasswordForm } from "@/types/auth";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordForm = ({ email }: { email: string }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSummitting] = useState(false);
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formData: ResetPasswordForm) => {
    setIsSummitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Koneksi internet tidak stabil atau bermasalah!");
    }

    setIsSummitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center  py-12 px-4 ">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Reset Kata Sandi
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Masukan kata sandi baru untuk {email}
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...form.register("email")} value={email} />
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata sandi Baru</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="********"
                          type={showPassword ? "text" : "password"}
                          className={cn({
                            "border-red-500": form.formState.errors.password,
                          })}
                          {...field}
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Kata sandi</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="********"
                          type={showConfirmPassword ? "text" : "password"}
                          className={cn({
                            "border-red-500": form.formState.errors.password,
                          })}
                          {...field}
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 "
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Loading..." : "Reset Kata Sandi"}
              </Button>
            </div>
          </form>
        </Form>

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

export default ResetPasswordForm;
