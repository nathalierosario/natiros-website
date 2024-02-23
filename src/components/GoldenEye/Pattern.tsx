import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BingoPattern } from "./BingoTypes";

type PatternProps = {
  pattern: BingoPattern;
  setPattern: React.Dispatch<React.SetStateAction<BingoPattern>>;
  dontCallLetters: string[];
  setDontCallLetters: React.Dispatch<React.SetStateAction<string[]>>;
  patternConfirmed: boolean;
};

export default function Pattern({
  pattern,
  setPattern,
  dontCallLetters,
  setDontCallLetters,
  patternConfirmed,
}: PatternProps) {
  // const [isPatternConfirmed, setIsPatternConfirmed] = useState(false);

  // Col is each letter in BINGO
  // Row is each index per letter in this column
  const clickPattern = (row: number, col: number) => {
    if (!patternConfirmed) {
      // Convert row and col to corresponding letter and index
      const letter = "BINGO".charAt(col);
      const index = row;

      setPattern((prevPattern) => {
        const updatedCells = [...prevPattern[letter as keyof BingoPattern]];
        updatedCells[index] = !updatedCells[index];

        const updatedPattern = {
          ...prevPattern,
          [letter]: updatedCells,
        };

        updateDontCall(updatedPattern);

        return updatedPattern;
      });
    }
  };

  const updateDontCall = (updatedPattern: BingoPattern) => {
    const updatedDontCall = "BINGO"
      .split("")
      .filter((letter) =>
        updatedPattern[letter as keyof BingoPattern].every((cell) => !cell)
      );
    setDontCallLetters(updatedDontCall.length === 5 ? [] : updatedDontCall);
  };

  return (
    <Container className="pattern-board">
      <Row className="g-1 justify-content-center ">
        {"BINGO".split("").map((letter, index) => (
          <Col
            key={index}
            className="p-1"
            xs={2}
            style={{ fontSize: "min(2vw, 2vh)", fontWeight: "bold" }}
          >
            <div className="text-center">{letter}</div>
          </Col>
        ))}
      </Row>
      {Array.from({ length: 5 }, (_, rowIndex) => (
        <Row key={rowIndex} className="g-1 justify-content-center">
          {Array.from({ length: 5 }, (_, colIndex) => (
            <Col
              key={`${rowIndex}-${colIndex}`}
              className="p-1"
              xs={2}
              style={{ aspectRatio: "1/1" }}
            >
              <Button
                variant={
                  pattern["BINGO".charAt(colIndex) as keyof BingoPattern][
                    rowIndex
                  ]
                    ? "light"
                    : "outline-turq"
                }
                className="w-100 h-100 d-flex justify-content-center align-items-center square-button"
                disabled={patternConfirmed}
                onClick={() => clickPattern(rowIndex, colIndex)}
                style={{ fontSize: "min(1vw, 1vh)" }}
              >
                {colIndex === 2 && rowIndex === 2 ? (
                  <span>FREE SPACE</span>
                ) : (
                  ""
                )}
              </Button>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}
