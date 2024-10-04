import { useState } from "react";
import { PlayerSettingsContext } from "./PlayerSettingsContext";

// Creo que ya no usaré esto
export const PlayerSettingsProvider = ({ children }) => {
  const [playerSettings, setPlayerSettings] = useState({
    rol: "",
  });

  return (
    <PlayerSettingsContext.Provider value={{}}>
      {children}
    </PlayerSettingsContext.Provider>
  );
};
