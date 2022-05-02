import React, { useState } from "react";
import { GameBoard } from "./features/tictactoe/components/GameBoard";
import { GameInfo } from "./features/tictactoe/components/GameInfo";
import "./styles.css";
import { applyMoves, calculateWinner } from "./util/game";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [moves, setMoves] = useState([]);
  const [step, setStep] = useState(0);
  const winner = calculateWinner(squares);
  const handleClickSquare = (position) => () => {
    // Ignore moves taken when:
    // 1. square is already filled
    // 2. winner is already declared
    // 3. game ended in a draw
    // 4. viewing a previous game state
    if (
      squares[position] ||
      winner ||
      moves.length === 9 ||
      step !== moves.length
    ) {
      return;
    }
    setSquares((squares) => {
      squares[position] = player;
      return squares;
    });
    setPlayer((player) => (player === "X" ? "O" : "X"));
    setMoves((moves) => [...moves, { position, player }]);
    setStep((step) => step + 1);
  };
  const handleJumpTo = (step) => () => {
    setStep(step);
    const { squares, player } = applyMoves(
      Array(9).fill(null),
      moves.slice(0, step)
    );
    setSquares(squares);
    setPlayer(player);
  };
  return (
    // Fragment short syntax
    <>
      {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header */}
      <header className="header">
        <h1>Tic-Tac-Toe</h1>
      </header>
      {/*https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main */}
      <main className="game">
        <GameBoard
          squares={squares}
          winner={winner}
          onClick={handleClickSquare}
        />
        <GameInfo
          moves={moves}
          winner={winner}
          player={player}
          step={step}
          onJumpTo={handleJumpTo}
        />
      </main>
    </>
  );
}
