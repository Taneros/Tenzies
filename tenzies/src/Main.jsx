import React, { useState } from "react";
import { Die } from "./Die";
import { nanoid } from "nanoid";

export default function Main() {
  const [dice, setDice] = useState(randArr());

  function randArr() {
    return [...Array.from({ length: 10 }, () => randDie())];
  }

  function handleRollDice() {
    setDice((oldDice) => oldDice.map((die) => (die.isHeld ? die : randDie())));
  }

  function randDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function holdDice(e, id) {
    setDice((oldArr) =>
      oldArr.map((el) => {
        return el.id === id ? { ...el, isHeld: !el.isHeld } : el;
      })
    );
  }

  return (
    <main className="main">
      <div className="main--instructions-wrapper">
        <h1 className="main--title">Tenzies</h1>
        <p className="main--instructions">
          Roll until all dice are the same. <br />
          Click each die to freeze it at its current value between rolls.
        </p>
      </div>
      <div className="main--die-wrapper">
        {dice.map((die, idx) => (
          <Die
            num={die.value}
            key={die.id}
            isHeld={die.isHeld}
            holdDice={(e) => holdDice(e, die.id)}
          />
        ))}
      </div>
      <button className="main--button" onClick={handleRollDice}>
        Roll
      </button>
    </main>
  );
}
