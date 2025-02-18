// import './styles/variables.scss'
import "./styles/main.scss";
import React from "react";
import MainNavbar from "./components/Navbar/MainNavbar";
import Footer from "./components/Footer";
import { mainNavItems } from "./constants/navbar";
import { useTabStore, useSettingStore } from "./stores/appStore";
import SecondaryNavbar from "./components/Navbar/SecondaryNavbar";

function App() {
  const { activeTabIndex, activeNavBar } = useTabStore();
  const { CRT } = useSettingStore();

  return (
    <>
      <div className={`${CRT ? "screen crt" : ""}`}>
        <div className="monitor">
          <table>
            <thead>
              {activeNavBar == "main" ? (
                <MainNavbar />
              ) : (
                <SecondaryNavbar title={activeNavBar}/>
              )}
            </thead>
            <tbody>
              {mainNavItems.map((navItem, index) => {
                return <React.Fragment key={index}>{activeTabIndex == index && <navItem.element />}</React.Fragment>;
              })}
            </tbody>
          </table>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
