import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
// import { OptionButton } from "../../components/OptionButton/OptionButton";
import { useContext, useState } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
// import { GAME_MODE } from "../../utils/constants";

export const Home = () => {
  // const [isExistsGameMode, setIsExistsGameMode] = useState(false);
  // const { chooseGameMode } = useContext(GameSettingsContext);
  const navigate = useNavigate();

  // const setGameMode = (gameMode) => {
  //   setIsExistsGameMode(true);
  //   chooseGameMode(gameMode);
  // };

  const nextRoute = () => {
    // if (!isExistsGameMode) return;
    navigate("/game/difficulty");
  };

  return (
    <div className="home">
      <h1 className="home__title">POLICÍA VS LADRÓN</h1>
      {/* <ul className="home__options">
        <li className="home__option">
          <OptionButton
            text={GAME_MODE.HUMAN_VS_PC}
            eventHandler={() => setGameMode(GAME_MODE.HUMAN_VS_PC)}
          />
        </li>
      </ul> */}
      <button onClick={nextRoute}>Empezar el juego</button>
    </div>
  );
};
