import croppedAB from "./images/croppedadultbingo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

interface BingoNumbers {
  B: number[];
  I: number[];
  N: number[];
  G: number[];
  O: number[];
}

type DisplayBoardProps = {
  calledNumbers: number[];
  currentBingo: number;
};

export default function DisplayBoard({
  calledNumbers,
  currentBingo,
}: DisplayBoardProps) {
  const bingoLetters = ["B", "I", "N", "G", "O"];
  const bingoNumbers: BingoNumbers = {
    B: Array.from({ length: 15 }, (_, i) => i + 1),
    I: Array.from({ length: 15 }, (_, i) => i + 16),
    N: Array.from({ length: 15 }, (_, i) => i + 31),
    G: Array.from({ length: 15 }, (_, i) => i + 46),
    O: Array.from({ length: 15 }, (_, i) => i + 61),
  };

  const getNumClassName = (number: number) => {
    if (number === currentBingo) return "current";
    if (calledNumbers.includes(number)) return "called";
    return "text-center";
  };

  return (
    <Container className="text-center">
      <Row>
        <Col>
          <Image fluid src={croppedAB}></Image>
        </Col>
      </Row>
      {bingoLetters.map((letter) => (
        <Row className="align-items-center display-board-row" key={letter}>
          <Col className="display-board-letter">{letter}</Col>
          {bingoNumbers[letter as keyof BingoNumbers].map((number) => (
            <Col
              key={number}
              className={`display-board-num ${getNumClassName(number)} my-3`}
            >
              {number}
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}
