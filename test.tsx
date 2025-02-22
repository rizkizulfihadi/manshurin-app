"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import LoadingSpinner from "@/components/auth/loading-spinner";

export default function NewPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      router.replace("/not-found");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-reset-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
        } else {
          toast.success(data.message);
          setEmail(data.data.email);
          setIsValid(true);
        }
      } catch (error) {
        toast.error("Koneksi internet tidak stabil atau bermasalah");
      }
    };

    verifyToken();
  }, [token, router]);

  if (isValid === null) return <LoadingSpinner />;
  if (isValid === false) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ResetPasswordForm email={email} />
    </div>
  );
}
