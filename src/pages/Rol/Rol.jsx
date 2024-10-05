import { Link, useNavigate } from "react-router-dom";
import "./Rol.css";
import { OptionButton } from "../../components/OptionButton/OptionButton";
import { ROLES } from "../../utils/constants";
import { useContext, useState } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";

export const Rol = () => {
  const [isExistsRol, setIsExistsRol] = useState(false);
  const { chooseRol } = useContext(GameSettingsContext);
  const navigate = useNavigate();

  const setRol = (rol) => {
    setIsExistsRol(true);
    chooseRol(rol);
  };

  const nextRoute = () => {
    if (!isExistsRol) return;
    navigate("/game/start");
  };

  return (
    <div>
      <h1>ESCOGE TU ROL</h1>
      <div>
        <OptionButton
          text={ROLES.POLICE}
          eventHandler={() => setRol(ROLES.POLICE)}
        />
        <OptionButton
          text={ROLES.THIEF}
          eventHandler={() => setRol(ROLES.THIEF)}
        />
      </div>
      <button onClick={nextRoute}>Siguiente</button>
    </div>
  );
};
