import { Link, useNavigate } from "react-router-dom";
import { OptionButton } from "../../components/OptionButton/OptionButton";
import "./Difficulty.css";
import { useContext, useState } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import { DIFFICULTIES } from "../../utils/constants";

export const Difficulty = () => {
  const [isExistsDifficulty, setIsExistsDifficulty] = useState(false);
  const { chooseDifficulty } = useContext(GameSettingsContext);
  const navigate = useNavigate();

  const setDifficulty = (difficulty) => {
    setIsExistsDifficulty(true);
    chooseDifficulty(difficulty);
  };

  const nextRoute = () => {
    if (!isExistsDifficulty) return;
    navigate("/game/rol");
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
      <button onClick={nextRoute}>Siguiente</button>
    </div>
  );
};
