import OtpForm from "@/components/auth/otp-form";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getTimeResend } from "@/lib/auth";

const VerifyOtpPage = async () => {
  const email = (await cookies()).get("SESSION_AUTH")?.value || "";

  if (!email) {
    redirect("/auth/login");
  }

  const counterResend = await getTimeResend(email);

  return <OtpForm email={email} counterResend={counterResend} />;
};

export default VerifyOtpPage;
