import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { argTab } from "../../utils/funcs";
import "../../styles/Terminal.scss";
import { commands } from "../../constants/command";
import Output from "../Command/Output";


type Term = {
  arg: string[];
  history: string[];
  rerender: boolean;
  index: number;
  clearHistory?: () => void;
};

export const termContext = createContext<Term>({
  arg: [],
  history: [],
  rerender: false,
  index: 0,
});

const TerminalPrompt = () => {
  return (
    <div className="terminal_info_Wrapper">
        <span className="user-name">yuugen</span>@<span className="host-name">terminal</span> ~ $
    </div>
)
}  
   

const Terminal = () => {
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [rerender, setRerender] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [pointer, setPointer] = useState(-1);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRerender(false);
      setInputVal(e.target.value);
    },
    [inputVal]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCmdHistory([inputVal, ...cmdHistory]);
    setInputVal("");
    setRerender(true);
    setHints([]);
    setPointer(-1);
  };

  const clearHistory = () => {
    setCmdHistory([]);
    setHints([]);
  };

  // focus on input when terminal is clicked
  const handleDivClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };
  useEffect(() => {
    document.addEventListener("click", handleDivClick);
    return () => {
      document.removeEventListener("click", handleDivClick);
    };
  }, [containerRef]);

  // Keyboard Press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setRerender(false);
    const ctrlI = e.ctrlKey && e.key.toLowerCase() === "i";
    const ctrlL = e.ctrlKey && e.key.toLowerCase() === "l";

    // if Tab or Ctrl + I
    if (e.key === "Tab" || ctrlI) {
      e.preventDefault();
      if (!inputVal) return;

      let hintsCmds: string[] = [];
      commands.forEach(({ cmd }) => {
        if (cmd.startsWith(inputVal)) {
          hintsCmds = [...hintsCmds, cmd];
        }
      });

      const returnedHints = argTab(inputVal, setInputVal, setHints, hintsCmds);
      hintsCmds = returnedHints ? [...hintsCmds, ...returnedHints] : hintsCmds;

      // if there are many command to autocomplete
      if (hintsCmds.length > 1) {
        setHints(hintsCmds);
      }
      // if only one command to autocomplete
      else if (hintsCmds.length === 1) {
        const currentCmd = inputVal.split(" ");
        setInputVal(
          currentCmd.length !== 1
            ? `${currentCmd[0]} ${currentCmd[1]} ${hintsCmds[0]}`
            : hintsCmds[0]
        );

        setHints([]);
      }
    }

    // if Ctrl + L
    if (ctrlL) {
      e.preventDefault();
      clearHistory();
    }

    // Go previous cmd
    if (e.key === "ArrowUp") {
      if (pointer >= cmdHistory.length) return;

      if (pointer + 1 === cmdHistory.length) return;

      setInputVal(cmdHistory[pointer + 1]);
      setPointer((prevState) => prevState + 1);
      inputRef?.current?.blur();
    }

    // Go next cmd
    if (e.key === "ArrowDown") {
      if (pointer < 0) return;

      if (pointer === 0) {
        setInputVal("");
        setPointer(-1);
        return;
      }

      setInputVal(cmdHistory[pointer - 1]);
      setPointer((prevState) => prevState - 1);
      inputRef?.current?.blur();
    }
  };

  // For caret position at the end
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef?.current?.focus();
    }, 1);
    return () => clearTimeout(timer);
  }, [inputRef, inputVal, pointer]);

  return (
        <div
          data-testid="terminal-wrapper"
          ref={containerRef}
          className="terminal_Wrapper"
        >
          {hints.length > 1 && (
            <div style={{width: "100%", display: "flex"}}>
              {hints.map((hCmd) => (
                <span className="terminal_Input" key={hCmd}>
                  {hCmd}
                </span>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="terminal_Form">
            <label htmlFor="terminal-input">
              <TerminalPrompt /> 
              <br className="terminal_MobileBr" />
              <span className="terminal_MobileSpan">&#62;</span>
            </label>

            <input
              className="terminal_Input"
              title="terminal-input"
              type="text"
              id="terminal-input"
              autoComplete="off"
              spellCheck="false"
              autoFocus
              autoCapitalize="off"
              ref={inputRef}
              value={inputVal}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              />
          </form>

          {cmdHistory.map((cmdH, index) => {
            const commandArray = cmdH.trim().split(" ");
            const validCommand = commands.find(
              (c) => c.cmd === commandArray[0]
            );
            const contextValue = {
              arg: commandArray,
              history: cmdHistory,
              rerender,
              index,
              clearHistory,
            };
            return (
              <div key={index}>
                <div>
                  <TerminalPrompt />
                  <br className="terminal_MobileBr" />
                  <span className="terminal_MobileSpan">&#62;</span>
                  <span data-testid="input-command">{cmdH}</span>
                </div>
                {validCommand ? (
                  <termContext.Provider value={contextValue}>
                    <Output index={index} cmd={commandArray[0]} />
                  </termContext.Provider>
                ) : cmdH === "" ? (
                  <div className="terminal_Empty" />
                ) : (
                  <div
                    data-testid={`not-found-${index}`}
                    className="terminal_CmdNotFound"
                  >
                    command not found: {cmdH}
                  </div>
                )}
              </div>
            );
          })}
        </div>
  );
};

export default Terminal;
