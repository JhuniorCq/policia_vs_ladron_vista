import { useState } from "react";
import { GameSettingsContext } from "./GameSettingsContext";
import { ROLES } from "../../utils/constants";

export const GameSettingsProvider = ({ children }) => {
  const [gameSettings, setGameSettings] = useState({
    gameMode: "Humano vs PC",
    difficulty: "",
    startTurn: "",
    housePositions: [],
    // housePositionsRobbed: [],
    // gameEnded: false,
    winner: "",
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
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      difficulty,
    }));
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

    setGameSettings((prevSettings) => ({
      ...prevSettings,
      players,
    }));
  };

  const defineStartTurn = (startTurn) => {
    console.log("Estamos definiendo el turno inicial: ", startTurn);

    setGameSettings((prevSettings) => ({
      ...prevSettings,
      startTurn,
    }));
  };

  const defineHousePositions = (housePositions) => {
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      housePositions,
    }));
  };

  // const endGame = (gameEnded) => {
  //   setGameSettings((prevSettings) => ({
  //     ...prevSettings,
  //     gameEnded,
  //   }));
  // };

  // const addRobbedHouse = (robbedHouse) => {
  //   setGameSettings((prevSettings) => ({
  //     ...prevSettings,
  //     housePositionsRobbed: [...prevSettings.housePositionsRobbed, robbedHouse],
  //   }));
  // };

  const resetRobbedHouses = () => {
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      housePositionsRobbed: [],
    }));
  };

  const setWinner = (winner) => {
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      winner,
    }));
  };

  return (
    <GameSettingsContext.Provider
      value={{
        gameSettings,
        chooseDifficulty,
        chooseRol,
        defineStartTurn,
        defineHousePositions,
        // endGame,
        // addRobbedHouse,
        resetRobbedHouses,
        setWinner,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};
