import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BingoPattern } from "./BingoTypes";

type PatternProps = {
  pattern: BingoPattern;
  setPattern: React.Dispatch<React.SetStateAction<BingoPattern>>;
  setDontCallLetters: React.Dispatch<React.SetStateAction<string[]>>;
  patternConfirmed: boolean;
};

export default function Pattern({
  pattern,
  setPattern,
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
    <Container fluid className="pattern-board p-0">
      <Row className="justify-content-center m-0 p-0 g-0">
        {"BINGO".split("").map((letter, index) => (
          <Col
            key={index}
            style={{ fontSize: "max(1.2vw, 1.5vh)", fontWeight: "bold" }}
          >
            <div className="text-center">{letter}</div>
          </Col>
        ))}
      </Row>
      {Array.from({ length: 5 }, (_, rowIndex) => (
        <Row key={rowIndex} className="m-0 p-0 g-0 justify-content-center">
          {Array.from({ length: 5 }, (_, colIndex) => (
            <Col
              key={`${rowIndex}-${colIndex}`}
              className="p-0 m-0 d-flex justify-content-center "
            >
              <Button
                variant={
                  pattern["BINGO".charAt(colIndex) as keyof BingoPattern][
                    rowIndex
                  ]
                    ? "info"
                    : "outline-turq"
                }
                className={`circle pattern-cell border-0 ${
                  rowIndex === 0 ? "border-top" : ""
                } ${
                  colIndex === 0 ? "border-start" : ""
                } border-end border-bottom`}
                disabled={patternConfirmed}
                onClick={() => clickPattern(rowIndex, colIndex)}
                style={{
                  fontSize: "max(0.8vw, 0.8vh)",
                  borderRadius: "0",
                  width: "100%",
                  minWidth: "10px"
                }}
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
