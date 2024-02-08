type RandomNumberProps = {
  availableNums: number[];
  setCurrentBingo: React.Dispatch<React.SetStateAction<number>>;
  setCalledNumbers: React.Dispatch<React.SetStateAction<number[]>>;
  setAvailableNums: React.Dispatch<React.SetStateAction<number[]>>;
};
export default function generateRandomNumber({
  availableNums,
  setCurrentBingo,
  setCalledNumbers,
  setAvailableNums,
}: RandomNumberProps) {
  if (availableNums.length > 0) {
    const randomNumber = availableNums[0];
    setCurrentBingo(randomNumber);
    setCalledNumbers((prev) => [...prev, randomNumber]);
    setAvailableNums((prev) => prev.slice(1));
  }
}
