import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

type BingoPattern = {
  B: boolean[];
  I: boolean[];
  N: boolean[];
  G: boolean[];
  O: boolean[];
};

export default function Pattern() {
  const initialPattern: BingoPattern = {
    B: Array(5).fill(false),
    I: Array(5).fill(false),
    N: Array(5).fill(false),
    G: Array(5).fill(false),
    O: Array(5).fill(false),
  };

  const dontCall: string[] = [];

  const [pattern, setPattern] = useState<BingoPattern>(initialPattern);
  const [dontCallLetters, setDontCallLetters] = useState<string[]>(dontCall);

  const clickPattern = (letter: keyof BingoPattern, index: number) => {
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
  };

  const updateDontCall = (updatedPattern: BingoPattern) => {
    const bingoLetters = Object.keys(updatedPattern) as (keyof BingoPattern)[];
    const updatedDontCall = bingoLetters.filter((l) =>
      updatedPattern[l].every((val) => !val)
    );

    setDontCallLetters(updatedDontCall.length === 5 ? [] : updatedDontCall);
  };

  return (
    <Container className="text-center pattern-board d-inline-flex w-auto">
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
                    variant={isClicked ? "danger" : "outline-danger"}
                    key={key + index}
                    className="pattern-cell-btn"
                  >
                    {key === "N" && index === 2 ? "FREE SPACE" : key + index}
                  </Button>
                </Col>
              </Row>
            ))}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
