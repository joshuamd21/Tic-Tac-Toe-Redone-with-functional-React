import React from "react";

export const MoveList = ({ moves, onJumpTo }) => {
  return (
    //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
    <nav className="moves">
      <ol>
        {moves.map((_, i) => (
          <li key={i}>
            <button onClick={onJumpTo(i)}>Go to move #{i + 1}</button>
          </li>
        ))}
      </ol>
    </nav>
  );
};
