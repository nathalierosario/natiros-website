import { useState } from "react";

export default function NumberGenerator() {
  const [bingoNum, setBingoNum] = useState(0);
  const [calledNums, setCalledNums] = useState<number[]>([]);
  const bingoLetters = ["B", "I", "N", "G", "O"];

  console.log(calledNums.length);

  return <h1>hi</h1>;
}