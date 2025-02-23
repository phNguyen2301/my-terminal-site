import theme from "../styles/theme";
export const argTab = (
    inputVal: string,
    setInputVal: (value: React.SetStateAction<string>) => void,
    setHints: (value: React.SetStateAction<string[]>) => void,
    hintsCmds: string[]
  ): string[] | undefined => {
    // 1) if input is 'themes '
    if (inputVal === "themes ") {
      setInputVal(`themes set`);
      return [];
    }
  
    // 2) if input is 'themes s'
    else if (
        inputVal.split(" ")[0].startsWith("themes") &&
        inputVal.split(" ")[1] !== "set" &&
        inputVal.split(" ")[1].startsWith("set")
    ) {
      setInputVal(`themes set`);
      return [];
    }
  
    // 3) if input is 'themes set '
    else if (inputVal === "themes set ") {
      setHints(Object.keys(theme));
      return [];
    }
  
    // 4) if input starts with 'themes set ' + theme
    else if (inputVal.startsWith("themes set ")) {
      Object.keys(theme).forEach(t => {
        if ( inputVal.split(" ")[2].startsWith(t) ) {
          hintsCmds = [...hintsCmds, t];
        }
      });
      return hintsCmds;
    }
  
    // 5) if input is 'projects' or 'socials'
    else if (inputVal === "projects " || inputVal === "socials ") {
      setInputVal(`${inputVal}go`);
      return [];
    }
  
    // 6) if input is 'projects g' or 'socials g'
    else if (inputVal === "projects g" || inputVal === "socials g") {
      setInputVal(`${inputVal}o`);
      return [];
    }
  
    // 7) if input is 'socials go '
    else if (inputVal.startsWith("socials go ")) {
      ["1.Github", "2.Dev.to", "3.Facebook", "4.Instagram"].forEach(t => {
        hintsCmds = [...hintsCmds, t];
      });
      return hintsCmds;
    }
  
    // 8) if input is 'projects go '
    else if (inputVal.startsWith("projects go ")) {
      [
        "1.Sat Naing's Blog",
        "2.Haru Fashion",
        "3.Haru API",
        "4.AstroPaper Blog Theme",
      ].forEach(t => {
        hintsCmds = [...hintsCmds, t];
      });
      return hintsCmds;
    }
  };