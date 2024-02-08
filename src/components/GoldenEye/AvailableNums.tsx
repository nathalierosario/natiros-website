export const generateAvailableNumbers = (dontCallLetters: string[]) => {
  let numbers = Array.from({ length: 75 }, (_, i) => i + 1);
  numbers = numbers.filter(
    (n) => !dontCallLetters.includes(getLetterForNumber(n))
  );
  return shuffleArray(numbers);
};

export const getLetterForNumber = (number: number) => {
  const letters = ["B", "I", "N", "G", "O"];
  return letters[Math.floor((number - 1) / 15)];
};

export const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
