import BonsaiTree from "./CBonsai";
import Clear from "./Clear";
import Help from "./Help";
import NeoFetch from "./Neofetch";

type Props = {
  index: number;
  cmd: string;
};

const Output: React.FC<Props> = ({ index, cmd }) => {



  return (
    <div data-testid={index === 0 ? "latest-output" : null}>
      {
        {
            neofetch: <NeoFetch />,
            cbonsai: <BonsaiTree />,
            help: <Help />,
            clear: <Clear />,
        }[cmd]
      }
    </div>
  );
};

export default Output;