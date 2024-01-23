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

  const [pattern, setPattern] = useState<BingoPattern>(initialPattern);

  return (
    <Container className="text-center pattern-board d-inline-flex w-auto">
      <Row className="justify-content-center g-0">
        {Object.keys(pattern).map((key) => (
          <Col key={key} className="flex-grow-0 pattern-bingo-letter">
            {key}
            {pattern[key as keyof BingoPattern].map((value, index) => (
              <Row>
                <Col className="flex-grow-0">
                  <Button variant="outline-dark" key={index} className="pattern-cell-btn">
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
