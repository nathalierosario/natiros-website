import { useState } from "react";
import { useEffect } from "react";

type InstructionDisplayProps = {
  confirmedInstructions: string[];
};

export default function InstructionDisplay({
  confirmedInstructions,
}: InstructionDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (confirmedInstructions.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % confirmedInstructions.length
        );
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [confirmedInstructions.length]);

  return confirmedInstructions.length > 0 ? (
    <div className="fadeInOut">{confirmedInstructions[currentIndex]}</div>
  ) : null;
}
