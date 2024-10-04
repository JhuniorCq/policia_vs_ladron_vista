import { useState } from "react";
import { GameSettingsContext } from "./GameSettingsContext";

export const GameSettingsProvider = ({ children }) => {
  const [gameSettings, setGameSettings] = useState({
    gameMode: "",
    difficulty: "",
  });

  const chooseGameMode = (gameMode) => {
    setGameSettings({ ...gameSettings, gameMode });
  };

  const chooseDifficulty = (difficulty) => {
    setGameSettings({ ...gameSettings, difficulty });
  };

  return (
    <GameSettingsContext.Provider
      value={{ gameSettings, chooseGameMode, chooseDifficulty }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};
