import "./Square.css";

export const Square = ({ children, image }) => {
  return (
    <div className="square">
      <img className="square-image" src={image} alt="" />
    </div>
  );
};
