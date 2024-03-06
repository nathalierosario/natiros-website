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
    <Container className="text-center bg-secondary-subtle rounded">
      {/* Image row, responsive for all screen sizes */}
      <Row>
        <Col className="p-0">
          <Image
            fluid
            rounded
            className="rounded-bottom-0"
            src={croppedAB}
          ></Image>
        </Col>
      </Row>

      {/* Dislay board for letters and numbers */}
      <Row className="display-board flex-row flex-md-column">
        {bingoLetters.map((letter) => (
          <Col
            className="display-container d-flex flex-column flex-md-row"
            key={letter}
          >
            <div className="display-letter">{letter}</div>
            <div className="display-numbers d-flex flex-column flex-md-row flex-grow-1">
              {bingoNumbers[letter as keyof BingoNumbers].map((number) => (
                <div
                  key={number}
                  className={`flex-grow-1 display-num ${getNumClassName(
                    number
                  )}`}
                >
                  {number}
                </div>
              ))}
            </div>
          </Col>
        ))}
      </Row>

      {/* <Row className="flex-column">
        {bingoLetters.map((letter) => (
          <Col className="d-flex" key={letter}>
            <div className="">{letter}</div>
            <div className="d-flex flex-row">
              {bingoNumbers[letter as keyof BingoNumbers].map((number) => (
                <div
                  key={number}
                  className={`${getNumClassName(number)}`}
                >
                  {number}
                </div>
              ))}
            </div>
          </Col>
        ))}
      </Row> */}
    </Container>
  );
}
