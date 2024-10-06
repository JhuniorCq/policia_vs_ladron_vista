import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Difficulty } from "../pages/Difficulty/Difficulty";
import { Rol } from "../pages/Rol/Rol";
import { Game } from "../pages/Game/Game";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/difficulty" element={<Difficulty />} />
      <Route path="/game/rol" element={<Rol />} />
      <Route path="/game/start" element={<Game />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
