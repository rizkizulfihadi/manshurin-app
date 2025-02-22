import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/logo";

interface CardWrapperProps {
  children: React.ReactNode;
  headerDescription: string;
  backButtonLabel: string;
  backButtonDescription: string;
  backButtonHref: string;
  loginGoogle?: boolean;
}

const CardWrapper = ({
  children,
  headerDescription,
  backButtonLabel,
  backButtonDescription,
  backButtonHref,
  loginGoogle,
}: CardWrapperProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <Link href="/" className="flex items-center mb-4 gap-x-2">
                  <Logo />
                  <span className="font-logo text-3xl">Manshurin</span>
                </Link>
                <p className="text-balance text-muted-foreground">
                  {headerDescription}
                </p>
              </div>
              {children}
              {loginGoogle && (
                <>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      atau
                    </span>
                  </div>
                  <div className="g">
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer"
                      asChild
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        <span>Lanjutkan dengan Google</span>
                      </div>
                    </Button>
                  </div>
                </>
              )}

              <div className="text-center text-sm">
                {backButtonDescription}{" "}
                <Link
                  href={backButtonHref}
                  className="underline underline-offset-4"
                >
                  {backButtonLabel}
                </Link>
              </div>
            </div>
          </div>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/images/bg-auth.jpg"
              alt="Image"
              width={500}
              height={500}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardWrapper;
