export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="lg:ml-54 w-full lg:p-10 sm:p-6 sm:pt-[70px] p-3">
      {children}
    </main>
  );
}
