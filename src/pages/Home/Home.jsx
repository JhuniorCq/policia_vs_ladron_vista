import { useNavigate } from "react-router-dom";
import "./Home.css";
import { OptionButton } from "../../components/OptionButton/OptionButton";

export const Home = () => {
  const navigate = useNavigate();

  const nextRoute = () => {
    navigate("/game/difficulty");
  };

  return (
    <div className="home">
      <OptionButton
        className="home__start-button"
        text="EMPEZAR EL JUEGO"
        eventHandler={nextRoute}
      />
    </div>
  );
};
