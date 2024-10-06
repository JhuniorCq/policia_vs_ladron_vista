import "./OptionButton.css";

export const OptionButton = ({
  text,
  eventHandler,
  className,
  disabledButton,
}) => {
  return (
    <button
      className={
        disabledButton ? `${className} option-button--disabled` : className
      }
      onClick={eventHandler}
    >
      {text}
    </button>
  );
};
