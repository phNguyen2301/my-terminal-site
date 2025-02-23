// import './styles/variables.scss'
import "./styles/main.scss";
import React from "react";
import MainNavbar from "./components/Navbar";
import { mainNavItems } from "./constants/navbar";
import { useTabStore, useSettingStore } from "./stores/appStore";
import SecondaryNavbar from "./components/Tabs/SecondaryNavbar";
import "./styles/Navbar/navBar.scss";

function App() {
  const { activeTabIndex, activeNavBar } = useTabStore();
  const { CRT } = useSettingStore();

  return (
    <>
      <div className={`${CRT ? "screen crt" : ""}`}>
        <div className="monitor">
          <div className="top-nav">
            {activeNavBar == "main" ? (
              <MainNavbar />
            ) : (
              <SecondaryNavbar title={activeNavBar} />
            )}
          </div>
          {mainNavItems.map((navItem, index) => {
            return (
              <React.Fragment key={index}>
                {activeTabIndex == index && <navItem.element />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
