import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BingoPattern } from "./GoldenEye/BingoTypes";
import { generateAvailableNumbers } from "./GoldenEye/AvailableNums";
import generateRandomNumber from "./GoldenEye/NumberGenerator";
import Pattern from "./GoldenEye/Pattern";
import BingoBall from "./GoldenEye/BingoBall";
import DisplayBoard from "./GoldenEye/DisplayBoard";
import Instructions from "./GoldenEye/Instructions";

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

  return (
    <Container data-bs-theme="dark" fluid className="text-center" style={{}}>
      <Row className="justify-content-center">
        <Col md="auto" style={{}}>
          <Pattern
            pattern={pattern}
            setPattern={setPattern}
            dontCallLetters={dontCallLetters}
            setDontCallLetters={setDontCallLetters}
            patternConfirmed={patternConfirmed}
            onConfirm={getBingoNumber}
          />

          <Col className="mt-3">
            <Instructions />
          </Col>

          <Col md="auto" className="mt-3" style={{}}>
            <BingoBall number={currentBingo} onClick={getBingoNumber} />
          </Col>
        </Col>

        <Col>
          <DisplayBoard
            calledNumbers={calledNumbers}
            currentBingo={currentBingo}
          />
        </Col>
      </Row>
    </Container>
  );
}
