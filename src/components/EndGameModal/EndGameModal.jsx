import "./EndGameModal.css";
import policeImage from "../../assets/image/police.png";
import thiefImage from "../../assets/image/thief.png";
import lightImage from "../../assets/image/light.png";
import { Link } from "react-router-dom";
import { ROLES } from "../../utils/constants";

export const EndGameModal = ({ winner, endGame }) => {
  const image =
    winner === ROLES.POLICE
      ? policeImage
      : winner === ROLES.THIEF
      ? thiefImage
      : null;

  return (
    <div className={endGame ? "end-game end-game--active" : "end-game"}>
      <div className="end-game__content">
        <img className="end-game__police-image" src={image} alt={winner} />
        <img className="end-game__light-image" src={lightImage} alt="Luz" />
        <div className="end-game__text">
          <div
            className={
              winner === ROLES.POLICE
                ? "end-game__title end-game__title--police-color"
                : winner === ROLES.THIEF
                ? "end-game__title end-game__title--thief-color"
                : "end-game__title"
            }
          >
            <p>GANÓ</p>
            <p>{winner}</p>
          </div>
          <Link className="end-game__button" to="/">
            VOLVER AL INICIO
          </Link>
        </div>
      </div>
    </div>
  );
};
