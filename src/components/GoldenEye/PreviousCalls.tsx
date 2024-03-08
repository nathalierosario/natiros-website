import { getLetterForNumber } from "./AvailableNums";

type PreviousCallsProps = {
  calledNumbers: number[];
  currentBingo: number;
  patternConfirmed: boolean;
};

type LetterColors = {
  [key: string]: string;
};

export default function PreviousCalls({
  calledNumbers,
  currentBingo,
  patternConfirmed,
}: PreviousCallsProps) {
  const prevCalled = calledNumbers.filter((number) => number !== currentBingo);
  const prevThreeCalled = prevCalled.slice(-3).reverse();

  const letterColors: LetterColors = {
    B: "#3D8095",
    I: "#d2107e",
    N: "#C7062D",
    G: "#7B018C",
    O: "#FF4500",
  };

  return (
    <div className="prev-calls-container">
      {patternConfirmed && (
        <>
          <span>previous calls</span>
          <div className="d-flex justify-content-center align-items-center">
            {prevThreeCalled.map((number, index) => {
              const letter = getLetterForNumber(number);
              const bgColor = letterColors[letter]; // Determine the background color based on the letter

              return (
                <div
                  key={index}
                  className="d-flex circle align-items-center justify-content-center"
                  style={{
                    backgroundColor: bgColor,
                    width: "max(10vw, 10vh)",
                  }}
                >
                  <div>{letter}</div>
                  <div>{"-"}</div>
                  <div>{number}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>

    // <div>
    //   {patternConfirmed && (
    //     <>
    //       <div className="fs-3 prev-calls-text">previous calls</div>
    //       <div className="d-flex justify-content-center flex-wrap">
    //         {prevThreeCalled.map((number, index) => (
    //           <div
    //             key={index}
    //             className="d-flex flex-column align-items-center justify-content-center border rounded-circle fs-4 mx-1"
    //             style={{ width: "7%", aspectRatio: 1 / 1 }}
    //           >
    //             <div>{getLetterForNumber(number)}</div>
    //             <div>{number}</div>
    //           </div>
    //         ))}
    //       </div>
    //     </>
    //   )}
    // </div>
  );
}
