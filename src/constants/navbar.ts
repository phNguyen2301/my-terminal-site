import ContactTab from "../components/Navbar/ContactTab";
import SettingTab from "../components/Navbar/SettingTab";
import HomeTab from "../components/Navbar/HomeTab";
import ToolTab from "../components/Navbar/ToolTab";
import { NavItemType } from "../types/navItemTypes";

export const mainNavItems: NavItemType[] = [
  { name: "home", element: HomeTab },
  { name: "tools", element: ToolTab },
  { name: "contacts", element: ContactTab },
  { name: "settings", element: SettingTab },
];
export const maxColSpan = mainNavItems.length;
