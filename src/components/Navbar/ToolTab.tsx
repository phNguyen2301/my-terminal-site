import "../../styles/Navbar/toolTab.scss";
import React, { useState, useEffect } from "react";
import { maxColSpan } from "../../constants/navbar";
import { apps } from "../../constants/tool";
import { useTabStore } from "../../stores/appStore";

export default function ToolTab() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { activeNavBar ,setActiveNavBar} = useTabStore();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : apps.length - 1
        );
      } else if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex < apps.length - 1 ? prevIndex + 1 : 0
        );
      } else if (event.key === "Enter") {
        setActiveNavBar(apps[selectedIndex].name)
        setActiveIndex(selectedIndex);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, setActiveNavBar]);
  return (
    <>
      {activeIndex > -1 && activeNavBar !== "main" ? (
        <>
          {
            apps.map((app, index) => {
              return <React.Fragment key={index}>{activeIndex == index && <app.element />}</React.Fragment>
            })
          }
        </>
      ) : (
        <tr>
          <td className="left-menu">
            <h3 className="menu-txt">~ TOOLS ~</h3>
            <ul>
              {apps.map((app, index: number) => (
                <li key={index} className="left-item">
                  <div
                    className={`menu-txt ${
                      index === selectedIndex ? "active" : ""
                    }`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    {app.name}
                  </div>
                </li>
              ))}
              <li>
                <div className="menu-txt">...</div>
              </li>
            </ul>
          </td>
          <td className="app-display" colSpan={maxColSpan - 1}>
            <p>{apps[selectedIndex].desc}</p>
          </td>
        </tr>
      )}
    </>
  );
}
