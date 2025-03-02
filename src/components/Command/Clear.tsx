import {  useEffect } from "react";
import { useTerminalStore } from "../../stores/terminalStore";

const Clear: React.FC = () => {
  const { setCmdHistory, setHints } = useTerminalStore()
  useEffect(() => {
    setCmdHistory([])
    setHints([])
  }, []);
  return <></>;
};

export default Clear;