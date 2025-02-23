import ContactTab from "../components/Tabs/ContactTab";
import SettingTab from "../components/Tabs/SettingTab";
import ToolTab from "../components/Tabs/ToolTab";
import { NavItemType } from "../types/navItemTypes";
import Terminal from "../components/Tabs/Terminal";

export const mainNavItems: NavItemType[] = [
  { name: "home", element: Terminal },
  { name: "tools", element: ToolTab },
  { name: "contacts", element: ContactTab },
  { name: "settings", element: SettingTab },
];
export const maxColSpan = mainNavItems.length;
