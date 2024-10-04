import { useNavigate } from "react-router-dom";
import { OptionButton } from "../../components/OptionButton/OptionButton";
import "./Difficulty.css";
import { useContext } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import { DIFFICULTIES } from "../../utils/constants";

export const Difficulty = () => {
  const { chooseDifficulty } = useContext(GameSettingsContext);
  const navigate = useNavigate();

  const nextRoute = (difficulty) => {
    chooseDifficulty(difficulty);
    navigate("/game");
  };

  return (
    <div>
      <h1>ESCOGE LA DIFICULTAD</h1>
      <ul>
        <li>
          <OptionButton
            text={DIFFICULTIES.BEGINNER}
            nextRoute={() => nextRoute(DIFFICULTIES.BEGINNER)}
          />
        </li>
        <li>
          <OptionButton
            text={DIFFICULTIES.NORMAL}
            nextRoute={() => nextRoute(DIFFICULTIES.NORMAL)}
          />
        </li>
        <li>
          <OptionButton
            text={DIFFICULTIES.EXPERT}
            nextRoute={() => nextRoute(DIFFICULTIES.EXPERT)}
          />
        </li>
      </ul>
    </div>
  );
};
