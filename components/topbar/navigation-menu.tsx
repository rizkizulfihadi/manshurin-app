import NavDesktop from "./nav-desktop";
import NavMobile from "./nav-mobile";

export default function NavigationMenu() {
  return (
    <nav className="order-1">
      <NavDesktop />
      <NavMobile />
    </nav>
  );
}
