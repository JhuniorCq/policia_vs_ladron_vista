import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Board } from "../pages/Board/Board";
import { Difficulty } from "../pages/Difficulty/Difficulty";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/difficulty" element={<Difficulty />} />
      <Route path="/game" element={<Board />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
