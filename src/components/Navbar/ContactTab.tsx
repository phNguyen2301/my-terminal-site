import "../../styles/Navbar/contactTab.scss"
import map from "../../assets/map.png";
import pin from "../../assets/pin.png";
import {useEffect, useState} from "react"
import { maxColSpan } from "../../constants/navbar";
import { contacts } from "../../constants/contact";
import { ContactType } from "../../types/contactType";

function SubMenu({contact} : {contact: ContactType} ) {
  const offsetRight = contact.subMenuPos === "left" ? 60 : -220;
  return <div className="sub-menu" 
  style={{top: -18,
    right: offsetRight}}>
    <p><span className="label">{contact.title}:</span> {contact.text}</p>

  </div>
}
function PinEl({contact, isActive, onClickFn} : {contact: ContactType, isActive: boolean, onClickFn: () => void}) {
  return (
    <div className={`pin-container ${isActive ? "selected" : ""}`} style={{top: contact.offsetTop, left: contact.offsetLeft}} onClick={onClickFn}>
      <img src={pin} alt="Pin" className="pin"/>
      {isActive && (
        <SubMenu contact={contact}/>
      )}
    </div>
  );
}

export default function ContactTab() {
  const numPin = 5
   const [selectedIndex, setSelectedIndex] = useState<number>(0);
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowUp") {
          setSelectedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : numPin - 1
          );
        } else if (event.key === "ArrowDown") {
          setSelectedIndex((prevIndex) =>
            prevIndex < numPin - 1 ? prevIndex + 1 : 0
          );
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex]);


  return (
      <tr>
        <td colSpan={maxColSpan}>
          <div className="tab-container">
            <div className="map-container">
              {contacts.map((c, index)=> { return (
                <PinEl contact={c}
                 isActive={index==selectedIndex} onClickFn={() => setSelectedIndex(index)}/>
              )
              })}
              <img id="map" src={map} alt="Treasure Map" />
            </div>
          </div>
        </td>
      </tr>
  );
}
