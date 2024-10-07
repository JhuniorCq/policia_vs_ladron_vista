import "./Square.css";

export const Square = ({ image }) => {
  return (
    <div className="square">
      <img className="square-image" src={image} alt="" />
    </div>
  );
};
