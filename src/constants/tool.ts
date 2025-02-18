import { ToolType } from "../types/toolTypes"; 
import SnakeGame from "../components/Tool/SnakeGame";
import GenArtTool from "../components/Tool/GenArt";
import AsciiGenTool from "../components/Tool/AsciiGen";
import ClockTimerTool from "../components/Tool/ClockTimer";
import DiceRoller from "../components/Tool/DiceRoller";
import SpinningDonut from "../components/Tool/SpinningDonut";

export const apps: ToolType[] = [
   
    {
      name: "Snake Game",
      desc: "Classic snake game. Eat, grow, and survive!",
      element: SnakeGame
    },
    {
      name: "Gen Art",
      desc: "Generate art using random functions.",
      element: GenArtTool
    },
    {
      name: "ASCII Generator",
      desc: "Convert images or text into ASCII art.",
      element: AsciiGenTool
    },
    {
      name: "Clock & Timer",
      desc: "Show current time or run a countdown, Pomodoro Timer.",
      element: ClockTimerTool
    },
    {
      name: "Dice Roller",
      desc: "Simulate rolling dice for board games.",
      element: DiceRoller
    },
    {
      name: "Spinning Donut",
      desc: "Spinning Donut...",
      element: SpinningDonut
    },
  ];
  