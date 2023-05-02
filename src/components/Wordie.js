import React, { useEffect, useState } from "react";
import useWordie from "../hooks/useWordie";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordie({ solution }) {
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } =
    useWordie(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      console.log("Congradulations! You won!");
      window.removeEventListener("keyup", handleKeyUp);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      console.log("Game Over!");
      window.removeEventListener("keyup", handleKeyUp);
    }
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, isCorrect, turn]);

  function handleKeyClick(letter) {
    if (letter === "Enter") {
      const syntheticEvent = new KeyboardEvent("keyup", { key: "Enter" });
      handleKeyUp(syntheticEvent);
    } else if (!usedKeys[letter]) {
      const syntheticEvent = new KeyboardEvent("keyup", { key: letter });
      handleKeyUp(syntheticEvent);
    }
  }

  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} onKeyClick={handleKeyClick} />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  );
}
