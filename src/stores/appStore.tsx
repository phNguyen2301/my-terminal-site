import { create } from "zustand";

interface TabState {
  activeNavBar: string,
  setActiveNavBar: (navbar: string) => void;
  activeTabIndex: number;
  setActiveTabIndex: (tab: number) => void;
}

export const useTabStore = create<TabState>((set) => ({
  activeNavBar: "main",
  setActiveNavBar: (navbar) => set({ activeNavBar: navbar}),
  activeTabIndex: 0,
  setActiveTabIndex: (tab) => set({ activeTabIndex: tab }),
}));



interface SettingState {
  CRT: boolean;
  setCRT: (toogle: boolean) => void;
}
export const useSettingStore = create<SettingState>((set) => ({
  CRT: true,
  setCRT: (toggle) => set({CRT: toggle}),
}));