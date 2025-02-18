import "../../styles/Navbar/navBar.scss"
import { useEffect } from "react"
import NavItem from "./NavItem"
import { mainNavItems } from "../../constants/navbar";
import { useTabStore } from "../../stores/appStore";


export default function MainNavbar() {
  const { activeTabIndex: activeIndex, setActiveTabIndex: setActiveIndex } = useTabStore();
     useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "ArrowLeft") {
            setActiveIndex(
                activeIndex > 0 ? activeIndex - 1 : mainNavItems.length - 1
            );
          } else if (event.key === "ArrowRight") {
            setActiveIndex(
                activeIndex < mainNavItems.length - 1 ? activeIndex + 1 : 0
            );
          } 
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      });
   

    return (
      <>
        <tr className="top-nav">
            {mainNavItems.map((tab, index) => (
              <td key={index}>
                  <NavItem
                  isActive = {activeIndex===index}
                  content = {tab.name}
                  onClickFn={() => setActiveIndex(index)}
                  />
              </td>
              ))}
        </tr>
      </>
    )
}

