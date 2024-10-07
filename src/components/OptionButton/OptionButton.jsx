import "./OptionButton.css";

export const OptionButton = ({
  text,
  eventHandler,
  className,
  // disabledButton,
}) => {
  return (
    <button className={className} onClick={eventHandler}>
      {text}
    </button>
  );
};
