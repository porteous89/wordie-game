import React, {useState, useEffect} from 'react'

export default function Keypad({ usedKeys, onKeyClick }) {
  const [letters, setLetters] = useState(null);
  const [enterClicked, setEnterClicked] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/letters")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);

  function handleEnterClick() {
    onKeyClick("Enter");
    setEnterClicked(true);
    setTimeout(() => setEnterClicked(false), 300);
  }

  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter.key];
          return (
            <div
              key={letter.key}
              className={`${color} ${
                letter.key === "Enter"
                  ? enterClicked
                    ? "enter-button-clicked"
                    : "enter-button"
                  : ""
              }`}
              onClick={() =>
                letter.key === "Enter"
                  ? handleEnterClick()
                  : onKeyClick(letter.key)
              }
            >
              {letter.key}
            </div>
          );
        })}
    </div>
  );
}