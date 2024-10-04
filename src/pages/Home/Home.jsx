import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { OptionButton } from "../../components/OptionButton/OptionButton";
import { useContext } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import { GAME_MODE } from "../../utils/constants";

export const Home = () => {
  const { chooseGameMode } = useContext(GameSettingsContext);
  const navigate = useNavigate();

  const setGameMode = (gameMode) => {
    chooseGameMode(gameMode);
  };

  return (
    <div className="home">
      <h1 className="home__title">POLICÍA VS LADRÓN</h1>
      <ul className="home__options">
        <li className="home__option">
          <OptionButton
            text={GAME_MODE.HUMAN_VS_PC}
            eventHandler={() => setGameMode(GAME_MODE.HUMAN_VS_PC)}
          />
        </li>
        {/* <li>
          <button></button>
        </li>
        <li>
          <button></button>
        </li> */}
      </ul>
      <Link to="/game/difficulty">Siguiente</Link>
    </div>
  );
};
