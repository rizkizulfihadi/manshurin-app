import Link from "next/link";
import { Button } from "../ui/button";

export default function ButtonAuth() {
  return (
    <div className="flex gap-x-2">
      <Button asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/auth/register">Register</Link>
      </Button>
    </div>
  );
}
