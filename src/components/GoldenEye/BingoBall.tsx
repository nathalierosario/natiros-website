import Button from "react-bootstrap/Button";
import { getLetterForNumber } from "./AvailableNums";

type BingoBallProps = {
  number: number;
  onClick: () => void;
};

export default function BingoBall({
  number,
  onClick,
}: BingoBallProps) {
  return (
    <Button
      className="circle bingo-ball"
      style={{ width: "70%" }}
      onClick={onClick}
    >
      {number > 0 ? (
        <>
          <div>{getLetterForNumber(number)}</div>
          <div>{number}</div>
        </>
      ) : (
        "start game"
      )}
    </Button>
  );
}
