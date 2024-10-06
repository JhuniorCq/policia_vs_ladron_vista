import "./Difficulty.css";
import { useNavigate } from "react-router-dom";
import { OptionButton } from "../../components/OptionButton/OptionButton";
import { useContext, useState } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import { DIFFICULTIES } from "../../utils/constants";
import policeImage from "../../assets/image/police.png";
import lightImage from "../../assets/image/light.png";
import { BackButton } from "../../components/BackButton/BackButton";

export const Difficulty = () => {
  const [isExistsDifficulty, setIsExistsDifficulty] = useState(false);
  const { chooseDifficulty } = useContext(GameSettingsContext);
  const navigate = useNavigate();

  const setDifficulty = (difficulty) => {
    // setIsExistsDifficulty(true);
    chooseDifficulty(difficulty);
    navigate("/game/rol");
  };

  return (
    <div className="difficulty">
      <div className="difficulty__content">
        <img className="difficulty__light-image" src={lightImage} alt="Light" />
        <img
          className="difficulty__police-image"
          src={policeImage}
          alt="Police"
        />
        <div className="difficulty__text-box">
          <h1 className="difficulty__title">ESCOGE LA DIFICULTAD</h1>
          <ul className="difficulty__options">
            <li>
              <OptionButton
                className="difficulty__button-option"
                text={DIFFICULTIES.BEGINNER}
                eventHandler={() => setDifficulty(DIFFICULTIES.BEGINNER)}
              />
            </li>
            <li>
              <OptionButton
                className="difficulty__button-option"
                text={DIFFICULTIES.NORMAL}
                eventHandler={() => setDifficulty(DIFFICULTIES.NORMAL)}
              />
            </li>
            <li>
              <OptionButton
                className="difficulty__button-option"
                text={DIFFICULTIES.EXPERT}
                eventHandler={() => setDifficulty(DIFFICULTIES.EXPERT)}
              />
            </li>
          </ul>
        </div>
        <BackButton
          className="difficulty__back-button difficulty__back-button--right"
          path="/"
        />
      </div>
    </div>
  );
};
