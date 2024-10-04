import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Board } from "../pages/Board/Board";
import { Difficulty } from "../pages/Difficulty/Difficulty";
import { Rol } from "../pages/Rol/Rol";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/difficulty" element={<Difficulty />} />
      <Route path="/game/rol" element={<Rol />} />
      <Route path="/game/start" element={<Board />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
