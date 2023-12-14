'use client'

import { useEffect, useState } from "react";
let initPlayKeys = {};
let pianoKeys = [
  { key: "A", description: "drum kit" },
  { key: "S", description: "boom" },
  { key: "D", description: "hihat" },
  { key: "F", description: "clap" },
  { key: "G", description: "kick" },
];

for (let element of pianoKeys) {
  initPlayKeys[element.key] = false;
}


export default function Hello() {
  useEffect(() => {
    function handleKeyDown(e) {
      let array = { ...playKeys };
      array[e.key.toUpperCase()] = true;
      setPlayKeys(array);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  function handleClick(e) {
    console.log(playKeys);
    let array = { ...playKeys };
    console.log(array);
    array[e.target.innerText] = true;
    setPlayKeys(array);
  }

  const [playKeys, setPlayKeys] = useState(initPlayKeys);
  console.log(playKeys);
  return (
    <div className="temp">
      {pianoKeys.map((element) => {
        return playKeys[element.key] ? (
          <button
            key={element.key}
            onClick={handleClick}
            style={{ "font-size": "4em" }}
          >
            {element.key}
          </button>
        ) : (
          <button key={element.key} onClick={handleClick}>
            {element.key}
          </button>
        );
      })}
    </div>
  );
}
