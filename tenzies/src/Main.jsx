import React, { useState, useEffect } from "react";
import { Die } from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Main() {
  const [dice, setDice] = useState(randArr());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const winArr = [[], []];

    dice.forEach((die) => {
      winArr[0].push = 1;
      winArr[1].push(die.value);
    });

    const allHeld = winArr[0].every((val) => val === true);
    const sameVal = winArr[1].every((val) => val === winArr[1][0]);

    if (allHeld && sameVal) {
      setTenzies(true);
      console.log(`Game Over`);
    }
  }, [dice]);

  function randArr() {
    return [...Array.from({ length: 10 }, () => randDie())];
  }

  function handleRollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => (die.isHeld ? die : randDie()))
      );
    } else {
      setDice(randArr());
      setTenzies((oldTenzies) => !oldTenzies);
    }
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
      <button
        className={tenzies ? "main--button __win" : "main--button"}
        onClick={handleRollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}
