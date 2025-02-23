import { maxColSpan } from "../../constants/navbar";
import { useSettingStore } from "../../stores/appStore";


export default function SettingTab() {
  const {CRT, setCRT} = useSettingStore();
    return <tr>
      <td colSpan={maxColSpan}>
        <button onClick={() => {
          setCRT(!CRT)
        }}
        > CRT </button>
        </td>
      </tr>;
  };
  