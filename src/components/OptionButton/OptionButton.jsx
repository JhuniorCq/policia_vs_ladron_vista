import "./OptionButton.css";

export const OptionButton = ({ text, eventHandler, className }) => {
  return (
    <button className={className} onClick={eventHandler}>
      {text}
    </button>
  );
};
