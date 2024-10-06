import { useNavigate } from "react-router-dom";
import "./Rol.css";
import { OptionButton } from "../../components/OptionButton/OptionButton";
import { ROLES } from "../../utils/constants";
import { useContext, useState } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import lightImage from "../../assets/image/light.png";
import thiefImage from "../../assets/image/thief.png";
import { BackButton } from "../../components/BackButton/BackButton";

export const Rol = () => {
  const [isExistsRol, setIsExistsRol] = useState(false);
  const { chooseRol } = useContext(GameSettingsContext);
  const navigate = useNavigate();

  const setRol = (rol) => {
    setIsExistsRol(true);
    chooseRol(rol);
    navigate("/game/start");
  };

  return (
    <div className="rol">
      <div className="rol__content">
        <img className="rol__light-image" src={lightImage} alt="Light" />
        <img className="rol__thief-image" src={thiefImage} alt="Police" />
        <div className="rol__text-box">
          <h1 className="rol__title">ESCOGE TU ROL</h1>
          <ul className="rol__options">
            <li>
              <OptionButton
                className="rol__button-option"
                text={ROLES.POLICE}
                eventHandler={() => setRol(ROLES.POLICE)}
              />
            </li>
            <li>
              <OptionButton
                className="rol__button-option"
                text={ROLES.THIEF}
                eventHandler={() => setRol(ROLES.THIEF)}
              />
            </li>
          </ul>
        </div>
        <BackButton
          className="rol__back-button rol__back-button--left"
          path="/game/difficulty"
        />
      </div>
    </div>
  );
};
