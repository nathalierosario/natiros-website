type InstructionDisplayProps = {
  confirmedInstructions: string[];
};

export default function InstructionDisplay({
  confirmedInstructions,
}: InstructionDisplayProps) {
  return (
    <div className="instruction-display">
      {confirmedInstructions.map((instruction, index) => (
        <span key={index}>
          {instruction}
          {index < confirmedInstructions.length - 1 ? " | " : ""}
        </span>
      ))}
    </div>
  );
}
