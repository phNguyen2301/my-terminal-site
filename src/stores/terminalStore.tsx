import { create } from "zustand";
import { CommandHistoryType } from "../types/commandType";

interface terminalState {
  hints: string[];
  setHints: (hints: string[]) => void;
  cmdHistory: CommandHistoryType[];
  setCmdHistory: (history: CommandHistoryType[]) => void;
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
}

export const useTerminalStore = create<terminalState>((set) => ({
  hints: [],
  setHints: (hints) => set({hints: hints}),
  cmdHistory: [],
  setCmdHistory: (history) => set({cmdHistory: history}),
  isFullScreen: false,
  setIsFullScreen: (isFullScreen) => set({isFullScreen: isFullScreen}),
}));