import { useContext, useEffect } from "react";
import { termContext } from "../Tabs/Terminal";

const Clear: React.FC = () => {
  const { clearHistory } = useContext(termContext);
  useEffect(() => {
    clearHistory?.();
  }, []);
  return <></>;
};

export default Clear;