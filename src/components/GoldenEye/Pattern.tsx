import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BingoPattern } from "./BingoTypes";
import { useState } from "react";

type PatternProps = {
  pattern: BingoPattern;
  setPattern: React.Dispatch<React.SetStateAction<BingoPattern>>;
  dontCallLetters: string[];
  setDontCallLetters: React.Dispatch<React.SetStateAction<string[]>>;
  patternConfirmed: boolean;
  onConfirm: () => void;
};

export default function Pattern({
  pattern,
  setPattern,
  dontCallLetters,
  setDontCallLetters,
  patternConfirmed,
  onConfirm,
}: PatternProps) {
  const [isPatternConfirmed, setIsPatternConfirmed] = useState(false);

  const clickPattern = (letter: keyof BingoPattern, index: number) => {
    if (!isPatternConfirmed) {
      setPattern((prevPattern) => {
        const updatedCells = [...prevPattern[letter]];
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
    const bingoLetters = Object.keys(updatedPattern) as (keyof BingoPattern)[];
    const updatedDontCall = bingoLetters.filter((l) =>
      updatedPattern[l].every((val) => !val)
    );

    setDontCallLetters(updatedDontCall.length === 5 ? [] : updatedDontCall);
  };

  return (
    <Container className="text-center pattern-board d-inline-flex w-auto flex-column">
      <Row className="justify-content-center g-0">
        {Object.keys(pattern).map((key) => (
          <Col key={key} className="flex-grow-0 pattern-bingo-letter">
            {key}
            {pattern[key as keyof BingoPattern].map((isClicked, index) => (
              <Row key={index}>
                <Col className="flex-grow-0">
                  <Button
                    onClick={() =>
                      clickPattern(key as keyof BingoPattern, index)
                    }
                    variant={isClicked ? "danger" : "outline-light"}
                    key={key + index}
                    className="pattern-cell-btn"
                    disabled={patternConfirmed}
                  >
                    {key === "N" && index === 2 ? "FREE SPACE" : ""}
                  </Button>
                </Col>
              </Row>
            ))}
          </Col>
        ))}
      </Row>

      {/* <div className="mt-3 d-block">
        <Button onClick={handleConfirmClick} disabled={isPatternConfirmed}>
          confirm pattern
        </Button>
      </div> */}
    </Container>
  );
}
