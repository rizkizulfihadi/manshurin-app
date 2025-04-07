import Sidebar from "@/components/Dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:mx-12">
      <Sidebar />
      <main className="lg:ml-54 w-full p-8">{children}</main>
    </div>
  );
}
