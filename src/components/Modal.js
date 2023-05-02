import React from "react";

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
      <h1>Congradulations! You won!</h1>
      <p className="solution">{solution}</p>
      <p>You found the Solution in {turn} guesses!</p>
      </div> 
        )}
        {!isCorrect && (
        <div>
        <h1>Game Over!</h1>
        <p className="solution">{solution}</p>
        <p>Better luck next time!</p>
        </div>
        )}
    </div>
    );
}
