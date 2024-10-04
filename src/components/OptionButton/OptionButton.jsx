import "./OptionButton.css";

export const OptionButton = ({ text, gameMode, nextRoute }) => {
  return <button onClick={nextRoute}>{text}</button>;
};

// Creo que todos los OptionButton deben tener el onClick, así que sagamos ese Operador Ternario
