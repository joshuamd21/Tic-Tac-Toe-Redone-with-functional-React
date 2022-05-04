import React, { useState } from "react";
import { GameBoard } from "./components/GameBoard";
import { GameInfo } from "./components/GameInfo";
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
    if (
      squares[position] ||
      winner
    ) {
      return;
    }
    else if(step < moves.length){
      setSquares((squares) => {
        squares[position] = player;
        return squares;
      });
      const newMoves = moves.slice(0, step + 1);
      setPlayer((player) => (player === "X" ? "O" : "X"));
      setMoves([...newMoves, { position, player }]);
      setStep((step) => step + 1);
    }
    else{
      setSquares((squares) => {
        squares[position] = player;
        return squares;
      });
      setPlayer((player) => (player === "X" ? "O" : "X"));
      setMoves((moves) => [...moves, { position, player }]);
      setStep((step) => step + 1);
    }
  };
  const handleJumpTo = (step) => () => {
    setStep(step);
    const { squares, player } = applyMoves(
      Array(9).fill(null),
      moves.slice(0, step + 1)
    );
    setSquares(squares);
    setPlayer(player);
  };
  const resetGame = () => {
    setStep(0);
    setSquares(Array(9).fill(null));
    setMoves([]);
    setPlayer('X');
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
          resetGame={resetGame}
          onJumpTo={handleJumpTo}
        />
      </main>
    </>
  );
}
