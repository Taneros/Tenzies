import React from "react";
import { Die } from "./Die";

export default function Main() {
  function randArr() {
    return [...Array.from({ length: 10 }, () => Math.ceil(Math.random() * 6))];
  }

  return (
    <main className="main">
      <div className="main--die-wrapper">
        {randArr().map((val, idx) => (
          <Die num={val} key={idx} />
        ))}
      </div>
    </main>
  );
}
