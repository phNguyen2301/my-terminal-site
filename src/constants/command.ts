import { CommandType } from "../types/commandType";
export const commands: CommandType[] = [
  { cmd: "neofetch", desc: "about me", isDisplayOuput: true, isFullScreen: true,},
  { cmd: "help", desc: "help", isDisplayOuput: true, isFullScreen: true,},
  { cmd: "clear", desc: "clear screen", isDisplayOuput: true, isFullScreen: true,},
  { cmd: "cbonsai", desc: "cbonsai", isDisplayOuput: false, isFullScreen: true, },
  { cmd: "cmatrix" , desc: "cmatrix", isDisplayOuput: true, isFullScreen: true,},
];