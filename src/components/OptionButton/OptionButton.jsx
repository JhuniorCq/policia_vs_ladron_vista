import "./OptionButton.css";

export const OptionButton = ({ text, eventHandler }) => {
  return <button onClick={eventHandler}>{text}</button>;
};
