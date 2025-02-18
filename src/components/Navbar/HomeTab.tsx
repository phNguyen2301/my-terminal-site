import { useEffect, useState } from "react";
import "../../styles/Navbar/homeTab.scss";
import { maxColSpan } from "../../constants/navbar";
import trainAscii from "../../assets/train.txt";

const commands = ["neofetch", "whoami", "sl", "fortune", "cmatrix", "cbonsai"];

function NeoFetch() {
  return (
    <tr className="cmd-line">
      <td colSpan={maxColSpan}>
        <div className="about-container">
          <pre className="ascii-art">
            {`⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽
⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕
⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣ `}
          </pre>
          <div className="info">
            <p className="hostname">
              <span className="label"></span> yuugen@terminal
            </p>
            <p className="dash-line"></p>
            <p>
              <span className="label">UserName:</span> Nguyen Duc Phuong Nguyen
            </p>
            <p>
              <span className="label">Gender:</span> Male
            </p>
            <p>
              <span className="label">Birthday:</span> Jan 23th, 2001
            </p>
            <p>
              <span className="label">Role:</span> Full-stack Web Developer
            </p>
            <p>
              <span className="label">Education:</span> Computer Science Degree,
              UIT HCM
            </p>
            <p>
              <span className="label">Location:</span> Ho Chi Minh, VietNam
            </p>
            <p>
              <span className="label">Programing Language:</span> HTML, CSS,
              JavaScript, Python, C++, C#{" "}
            </p>
            <p>
              <span className="label">Framework/Platform:</span> ReactJS,
              NodeJS, ASP.NET, Jquery, Shopify Liquid, Sass
            </p>
            <p>
              <span className="label">Database:</span> MS SQL Server, MongoDB,
              SQLite{" "}
            </p>
            <p>
              <span className="label">Dev tools:</span> Git, Jira, Figma,
              Postman{" "}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}

function WhoAmI() {
  return (
    <tr className="cmd-line">
      <td colSpan={maxColSpan}>
        <div>
          I am a highly motivated and hard-working person with a great passion
          for technology. I enjoy spending time learning new technologies. My
          goal is to become a software engineering, specifically in web
          development
        </div>
      </td>
    </tr>
  );
}

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
      if (showCmdOutput && commands[selectedCmdIndex] == "sl")
        return
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
          {commands[selectedCmdIndex] == "whoami" && <WhoAmI />}
          {commands[selectedCmdIndex] == "sl" && (
            <SLTrain
              onComplete={() => {
                setShowCmdOutput(false);
                setSelectedCmdIndex(0);
              }}
            />
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
