import LoadingSpinner from "@/components/auth/loading-spinner";
import VerifyTokenPage from "@/components/auth/verify-token";
import { Suspense } from "react";

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) => {
  const token = (await searchParams).token;

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <VerifyTokenPage token={token} />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
