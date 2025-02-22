import { redirect } from "next/navigation";
import LoadingSpinner from "@/components/auth/loading-spinner";
import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

async function ResetPasswordPage({ token }: { token: string }) {
  if (!token) {
    redirect("/not-found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-reset-token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return redirect("/not-found");
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordForm email={data.data.email} />
    </Suspense>
  );
}

export default ResetPasswordPage;
