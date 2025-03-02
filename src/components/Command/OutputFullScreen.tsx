import { useEffect } from "react";
import { useTerminalStore } from "../../stores/terminalStore";
import BonsaiTree from "./CBonsai";


type Props = {
  cmd: string;
};

const OutputFullScreen: React.FC<Props> = ({ cmd }) => {
    const { isFullScreen, setIsFullScreen} = useTerminalStore();
    useEffect(() => {
        const handleKeyPressed = (e: KeyboardEvent) => {
            e.preventDefault();
            setIsFullScreen(false);
            document.removeEventListener("keydown", handleKeyPressed);
        };
        document.addEventListener("keydown", handleKeyPressed);
    }, []);
    return (
        isFullScreen ? (
        <div>
        {
            {
                cbonsai: <BonsaiTree />,
            }[cmd]
        }
        </div>) : (
            <div className="terminal_Empty" />
        )
    );
};

export default OutputFullScreen;