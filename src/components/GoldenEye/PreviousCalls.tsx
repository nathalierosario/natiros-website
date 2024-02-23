import { getLetterForNumber } from "./AvailableNums";

type PreviousCallsProps = {
  calledNumbers: number[];
  currentBingo: number;
  patternConfirmed: boolean;
};

export default function PreviousCalls({
  calledNumbers,
  currentBingo,
  patternConfirmed,
}: PreviousCallsProps) {
  const prevCalled = calledNumbers.filter((number) => number !== currentBingo);
  const prevThreeCalled = prevCalled.slice(-3).reverse();

  return (
    <div>
      {patternConfirmed && (
        <>
          <div className="fs-3 prev-calls-text">previous calls</div>
          <div className="d-flex justify-content-center flex-wrap">
            {prevThreeCalled.map((number, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center justify-content-center border rounded-circle fs-4 mx-1"
                style={{ width: "7%", aspectRatio: 1/1 }}
              >
                <div>{getLetterForNumber(number)}</div>
                <div>{number}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
