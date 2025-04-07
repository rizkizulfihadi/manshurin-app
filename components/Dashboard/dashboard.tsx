import MainContent from "./main-content";
import { SidebarDesktop, SidebarTablet } from "./sidebar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row lg:mx-12">
      <SidebarDesktop />
      <SidebarTablet />
      <MainContent>{children}</MainContent>
    </div>
  );
}
