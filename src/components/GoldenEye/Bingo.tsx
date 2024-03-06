import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BingoPattern } from "./BingoTypes";
import { generateAvailableNumbers } from "./AvailableNums";
import generateRandomNumber from "./NumberGenerator";
import Pattern from "./Pattern";
import BingoBall from "./BingoBall";
import DisplayBoard from "./DisplayBoard";
import Instructions from "./Instructions";
import PreviousCalls from "./PreviousCalls";
import { useLayout } from "./LayoutContext";

export default function Bingo() {
  const initialPattern: BingoPattern = {
    B: Array(5).fill(false),
    I: Array(5).fill(false),
    N: Array(5).fill(false),
    G: Array(5).fill(false),
    O: Array(5).fill(false),
  };

  // Array of letters that do not need to be called
  // Could be empty
  const dontCall: string[] = [];

  // Current pattern selected by user
  const [pattern, setPattern] = useState<BingoPattern>(initialPattern);
  // Letters that do not need to be called based on user selected pattern
  const [dontCallLetters, setDontCallLetters] = useState<string[]>(dontCall);
  // Current Bingo Number
  const [currentBingo, setCurrentBingo] = useState(0);
  // List of called numbers
  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  // List of available numbers based on pattern
  const [availableNums, setAvailableNums] = useState<number[]>([]);
  // TO DO: IMPLEMENT GENERATE RANDOM NUM IN THIS FILE

  const [patternConfirmed, setPatternConfirmed] = useState(false);

  //Instructions list set by the user
  const [confirmedInstructions, setConfirmedInstructions] = useState<string[]>(
    []
  );

  // Getting navbar height
  const { navbarHeight } = useLayout();

  const getBingoNumber = () => {
    if (!patternConfirmed) {
      setPatternConfirmed(true);
      const updatedAvailableNums = generateAvailableNumbers(dontCallLetters);
      setAvailableNums(updatedAvailableNums);

      generateRandomNumber({
        availableNums: updatedAvailableNums,
        setCurrentBingo,
        setCalledNumbers,
        setAvailableNums,
      });
    } else {
      generateRandomNumber({
        availableNums,
        setCurrentBingo,
        setCalledNumbers,
        setAvailableNums,
      });
    }
  };

  const resetBoard = () => {
    setPattern(initialPattern);
    setDontCallLetters(dontCall);
    setCurrentBingo(0);
    setCalledNumbers([]);
    setAvailableNums([]);
    setPatternConfirmed(false);
    setConfirmedInstructions([]);
  };

  return (
    <Container
      data-bs-theme="dark"
      fluid
      className="text-center"
      style={{ paddingTop: navbarHeight }}
    >
      <Row className="justify-content-center g-0">
        <Col xs={4} md={2}>
          <Pattern
            pattern={pattern}
            setPattern={setPattern}
            setDontCallLetters={setDontCallLetters}
            patternConfirmed={patternConfirmed}
          />
          <Col>
            <Button
              size="sm"
              variant="simple"
              className="rounded"
              style={{
                borderColor: "transparent",
              }}
              onClick={resetBoard}
            >
              clear board
            </Button>
          </Col>

          <Col className="mt-3">
            <Instructions
              confirmedInstructions={confirmedInstructions}
              setConfirmedInstructions={setConfirmedInstructions}
            />
          </Col>

          <Col className="d-flex justify-content-center ">
            <BingoBall number={currentBingo} onClick={getBingoNumber} />
          </Col>
        </Col>

        <Col xs={8} md={10}>
          <DisplayBoard
            calledNumbers={calledNumbers}
            currentBingo={currentBingo}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <PreviousCalls
            calledNumbers={calledNumbers}
            currentBingo={currentBingo}
            patternConfirmed={patternConfirmed}
          />
        </Col>
      </Row>
    </Container>
  );
}
