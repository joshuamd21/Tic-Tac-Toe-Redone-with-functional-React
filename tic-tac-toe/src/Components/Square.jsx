import React from "react";

export const Square = ({ value, winner, onClick }) => {
  const className = winner ? "square winner" : "square";
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};
