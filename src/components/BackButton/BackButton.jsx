import { Link } from "react-router-dom";
import "./BackButton.css";

export const BackButton = ({ className, path }) => {
  return (
    <Link className={className} to={path}>
      ATRÁS
    </Link>
  );
};
