import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();

  const nextRoute = () => {
    navigate("/game/difficulty");
  };

  return (
    <div className="home">
      <h1 className="home__title">POLICÍA VS LADRÓN</h1>
      <button onClick={nextRoute}>Empezar el juego</button>
    </div>
  );
};
