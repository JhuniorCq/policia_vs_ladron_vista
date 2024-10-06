import { useState } from "react";
import { GameSettingsContext } from "./GameSettingsContext";
import { ROLES } from "../../utils/constants";

export const GameSettingsProvider = ({ children }) => {
  const [gameSettings, setGameSettings] = useState({
    gameMode: "Humano vs PC",
    difficulty: "",
    players: {
      player1: {
        rol: "",
      },
      player2: {
        rol: "",
      },
    },
  });

  const chooseDifficulty = (difficulty) => {
    setGameSettings({ ...gameSettings, difficulty });
  };

  const chooseRol = (rol) => {
    const rolUser = rol === ROLES.POLICE ? ROLES.POLICE : ROLES.THIEF;
    const rolComputer = rolUser === ROLES.POLICE ? ROLES.THIEF : ROLES.POLICE;
    const players = {
      player1: {
        rol: rolUser,
      },
      player2: {
        rol: rolComputer,
      },
    };
    setGameSettings({ ...gameSettings, players });
  };

  return (
    <GameSettingsContext.Provider
      value={{ gameSettings, chooseDifficulty, chooseRol }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};
