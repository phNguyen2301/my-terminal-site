import { useEffect } from "react";
import "../../styles/Navbar/navBar.scss"
import { useTabStore } from "../../stores/appStore";
export default function SecondaryNavbar({title}: {title: string}) {
  const {setActiveNavBar} = useTabStore();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActiveNavBar("main")
              }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }, [setActiveNavBar]);
    
  return (
    <>
      <tr className="top-nav">
        <td>
            <div className="nav-item" onClick={() => setActiveNavBar("main")}>
                ← ESC 
            </div>
        </td>
        <td colSpan={7}>
            <div className="nav-item active">
            {title}
            </div>
        </td>
      </tr>
    </>
  );
}
