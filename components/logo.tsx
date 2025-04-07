import Image from "next/image";

export function Logo() {
  return (
    <div>
      {/* Logo mode light */}
      <Image
        src="/images/logo-light.png"
        width={100}
        height={100}
        alt="logo-light"
        className="block dark:hidden size-12 sm:size-10"
      />

      {/* Logo mode dark */}
      <Image
        src="/images/logo-dark.png"
        width={100}
        height={100}
        alt="logo-dark"
        className="hidden dark:block size-12 sm:size-10"
      />
    </div>
  );
}
