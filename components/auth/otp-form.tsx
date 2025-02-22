"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OtpSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const OtpForm = ({
  email,
  counterResend,
}: {
  email: string;
  counterResend: number;
}) => {
  const router = useRouter();
  const [timer, setTimer] = useState(counterResend);
  const [canResend, setCanResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof OtpSchema>) {
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: formData.otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.error("Koneksi internet tidak stabil atau bermasalah");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendOtp() {
    setCanResend(false);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      setTimer(data.data.countTimer * 5 * 60);
    } else {
      toast.error(data.message);
      router.push("/auth/login");
    }
  }

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setCanResend(true);
    }

    return () => clearTimeout(countdown);
  }, [timer]);

  const formatTimeMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-center mt-[20vh]">
      <div className="p-6 ">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <Logo />
          <span className="text-3xl font-logo">Manshurin</span>
        </div>

        {/* Form OTP */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">One Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field} autoFocus>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="size-14 text-xl" />
                        <InputOTPSlot index={1} className="size-14 text-xl" />
                        <InputOTPSlot index={2} className="size-14 text-xl" />
                        <InputOTPSlot index={3} className="size-14 text-xl" />
                        <InputOTPSlot index={4} className="size-14 text-xl" />
                        <InputOTPSlot index={5} className="size-14 text-xl" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="w-[300px]">
                    Mohon masukkan kode OTP yang telah dikirimkan ke email{" "}
                    {email}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Tombol Submit */}
            <Button
              type="submit"
              className="w-full mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Verifikasi"}
            </Button>
          </form>
        </Form>

        {/* Resend OTP Section */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {canResend
              ? "Tidak menerima kode OTP?"
              : `Anda dapat mengirim OTP ulang dalam ${formatTimeMinutes(
                  timer
                )}`}
          </p>
          <Button
            variant="link"
            onClick={handleResendOtp}
            disabled={!canResend}
            className={`mt-2 text-blue-500 ${
              !canResend && "opacity-50 cursor-not-allowed"
            }`}
          >
            Kirim Ulang OTP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
