import { Link, useNavigate } from "react-router-dom";
import { OptionButton } from "../../components/OptionButton/OptionButton";
import "./Difficulty.css";
import { useContext } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import { DIFFICULTIES } from "../../utils/constants";

export const Difficulty = () => {
  const { chooseDifficulty } = useContext(GameSettingsContext);
  const navigate = useNavigate();

  const setDifficulty = (difficulty) => {
    chooseDifficulty(difficulty);
  };

  return (
    <div>
      <h1>ESCOGE LA DIFICULTAD</h1>
      <ul>
        <li>
          <OptionButton
            text={DIFFICULTIES.BEGINNER}
            eventHandler={() => setDifficulty(DIFFICULTIES.BEGINNER)}
          />
        </li>
        <li>
          <OptionButton
            text={DIFFICULTIES.NORMAL}
            eventHandler={() => setDifficulty(DIFFICULTIES.NORMAL)}
          />
        </li>
        <li>
          <OptionButton
            text={DIFFICULTIES.EXPERT}
            eventHandler={() => setDifficulty(DIFFICULTIES.EXPERT)}
          />
        </li>
      </ul>
      <Link to="/game/rol">Siguiente</Link>
    </div>
  );
};
