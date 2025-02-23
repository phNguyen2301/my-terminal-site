import { useEffect, useState } from "react";
import "../../styles/Navbar/homeTab.scss";
import { maxColSpan } from "../../constants/navbar";
import trainAscii from "../../assets/train.txt";
import BonsaiTree from "../Command/CBonsai";
import NeoFetch from "../Command/Neofetch";

const commands = ["neofetch", "whoami", "sl", "fortune", "cmatrix", "cbonsai"];


function SLTrain({ onComplete }: { onComplete: () => void }) {
  const [train, setTrain] = useState<string>("");
  const [position, setPosition] = useState<number>(200);

  useEffect(() => {
    fetch(trainAscii)
      .then((res) => res.text())
      .then((data) => setTrain(data))
      .catch((err) => console.error("Error loading train art:", err));
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <tr>
      <td colSpan={maxColSpan}>
        <pre style={{ whiteSpace: "pre", transform: "translateX(-65rem)" }}>
          {train
            .split("\n")
            .map((line) => " ".repeat(position) + line)
            .join("\n")}
        </pre>
      </td>
    </tr>
  );
}

export default function HomeTab() {
  const [isActive, setIsActive] = useState(false);
  const [selectedCmdIndex, setSelectedCmdIndex] = useState(0);
  const [showCmdOutput, setShowCmdOutput] = useState(false);
  const getTime = () => {
    return new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const [curTime, setCurTime] = useState(getTime());
  const [cmdTime, setCmdTime] = useState(getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurTime(getTime());
    }, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showCmdOutput && commands[selectedCmdIndex] == "sl") return;
      if (event.key === "ArrowUp") {
        setSelectedCmdIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : commands.length - 1
        );
      } else if (event.key === "ArrowDown") {
        setSelectedCmdIndex((prevIndex) =>
          prevIndex < commands.length - 1 ? prevIndex + 1 : 0
        );
      } else if (event.key === "Enter") {
        if (!isActive) {
          setShowCmdOutput(false);
          setSelectedCmdIndex(0);
        } else {
          setShowCmdOutput(true);
          setCmdTime(getTime());
        }
        setIsActive(!isActive);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedCmdIndex, isActive, showCmdOutput]);
  return (
    <>
      {showCmdOutput && (
        <>
          <tr className="cmd-line">
            <td colSpan={maxColSpan}>
              <span className="user-name">yuugen</span>@
              <span className="host-name">terminal</span> <span>{cmdTime}</span>{" "}
              ~ $ {commands[selectedCmdIndex]}
            </td>
          </tr>
          {commands[selectedCmdIndex] == "neofetch" && <NeoFetch />}
          {commands[selectedCmdIndex] == "sl" && (
            <SLTrain
              onComplete={() => {
                setShowCmdOutput(false);
                setSelectedCmdIndex(0);
              }}
            />
          )}
          {commands[selectedCmdIndex] == "cbonsai" && (
            <tr>
              <td colSpan={maxColSpan}>
                <BonsaiTree />
              </td>
            </tr>
          )}
        </>
      )}
      {(!showCmdOutput || commands[selectedCmdIndex] !== "sl") && (
        <tr className="cmd-line">
          <td colSpan={maxColSpan}>
            <span className="user-name">yuugen</span>@
            <span className="host-name">terminal</span> <span>{curTime}</span> ~
            $
            {isActive ? (
              <>
                {commands.map((cmd, index) => (
                  <div
                    key={index}
                    className={`cmd-item ${
                      index == selectedCmdIndex ? "selected" : ""
                    }`}
                  >
                    &gt;
                    <span className="cmd-text">{cmd}</span>
                  </div>
                ))}
              </>
            ) : (
              <span className="blinking-cursor"></span>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
