import { Link } from "react-router-dom";
import "./Rol.css";
import { OptionButton } from "../../components/OptionButton/OptionButton";
import { ROLES } from "../../utils/constants";
import { useContext } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";

export const Rol = () => {
  const { chooseRol } = useContext(GameSettingsContext);
  const setRol = (rol) => {
    chooseRol(rol);
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
      <Link to="/game/start">Siguiente</Link>
    </div>
  );
};
