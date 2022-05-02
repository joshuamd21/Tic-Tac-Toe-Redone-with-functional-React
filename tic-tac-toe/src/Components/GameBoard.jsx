import { Square } from "./Square";

export const GameBoard = ({ squares, winner, onClick }) => {
  return (
    <div className="game-board">
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          winner={winner && winner.includes(i)}
          onClick={onClick(i)}
        />
      ))}
    </div>
  );
};
