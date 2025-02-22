"use client";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema/auth";
import { useState } from "react";
import type { RegisterForm } from "@/types/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (formData: RegisterForm) => {
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      }
    } catch (error) {
      toast.error("Koneksi internet tidak stabil atau bermasalah!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <CardWrapper
          headerDescription="Selamat datang, mari bergabung bersama manshurin!"
          backButtonDescription="sudah punya akun?"
          backButtonHref="login"
          backButtonLabel="Masuk"
          loginGoogle
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama lengkap</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan nama kamu"
                          type="text"
                          className={cn({
                            "border-red-500 text-sm":
                              form.formState.errors.name,
                          })}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan email kamu"
                          type="email"
                          className={cn({
                            "border-red-500": form.formState.errors.email,
                          })}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata sandi</FormLabel>

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
              </div>
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Daftar"}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};

export default RegisterForm;
