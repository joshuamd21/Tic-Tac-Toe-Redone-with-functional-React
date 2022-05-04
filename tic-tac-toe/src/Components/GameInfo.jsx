import React from "react";
import { MoveList } from "./MoveList";

export const GameInfo = ({ moves, winner, player, resetGame, onJumpTo }) => {
  const status = winner
    ? `Winner: ${moves[moves.length - 1].player}`
    : moves.length === 9
    ? "Draw!"
    : `Next turn: ${player}`;
  return (
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
    <section className="game-info">
      <h3>{status}</h3>
      <MoveList moves={moves} onJumpTo={onJumpTo} />
      {moves.length > 0 && (
        <button onClick={resetGame}>Reset Game</button>
      )}
    </section>
  );
};
