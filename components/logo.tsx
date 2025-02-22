import Image from "next/image";

const Logo = () => {
  return (
    <div>
      {/* Gambar untuk mode light */}
      <Image
        src="/images/logo-light.png"
        width={50}
        height={50}
        alt="logo"
        className="block dark:hidden size-12 lg:size-10"
      />

      {/* Gambar untuk mode dark */}
      <Image
        src="/images/logo-dark.png"
        width={50}
        height={50}
        alt="logo-dark"
        className="hidden dark:block size-12 lg:size-10"
      />
    </div>
  );
};

export default Logo;
