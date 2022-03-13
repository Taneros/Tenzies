import React from "react";

export function Die(props) {
  return (
    <div
      className={props.isHeld ? "main--die --isHeld" : "main--die"}
      onClick={(e) => props.holdDice(e)}
    >
      <p className="die--num">{props.num}</p>
    </div>
  );
}
