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
        <div>
            <div className="nav-item" onClick={() => setActiveNavBar("main")}>
                ← ESC 
            </div>
        </div>
        <div style={{flex: 8}}>
            <div className="nav-item active">
            {title}
            </div>
        </div>
    </>
  );
}
