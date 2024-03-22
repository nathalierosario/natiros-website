import { FormEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import ListGroup from "react-bootstrap/ListGroup";
import { BsCheckLg } from "react-icons/bs";
import { MdOutlineMessage } from "react-icons/md";

type InstructionsProps = {
  confirmedInstructions: string[];
  setConfirmedInstructions: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Instructions({
  // confirmedInstructions,
  setConfirmedInstructions,
}: InstructionsProps) {
  const [instruction, setInstruction] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const handleInstructionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstruction(e.target.value);
  };

  const handleConfirmedInstructions = (e?: FormEvent) => {
    e?.preventDefault();
    setConfirmedInstructions((prev) => [...prev, instruction]);

    setInstruction("");
    setShowModal(false);

    const marqueeInstructions = document.querySelector(
      ".instruction-display"
    ) as HTMLElement | null;

    if (marqueeInstructions) {
      marqueeInstructions.style.animation = "none";

      void marqueeInstructions.offsetHeight;

      marqueeInstructions.style.animation = "";
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        title="instructions"
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <MdOutlineMessage />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>add instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleConfirmedInstructions}>
            <Form.Group controlId="instructionInput">
              <Form.Control
                autoFocus
                type="text"
                placeholder="instructions"
                value={instruction}
                onChange={handleInstructionChange}
                autoComplete="off"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="glass"
            onClick={handleConfirmedInstructions}
            disabled={!instruction.trim()}
          >
            <BsCheckLg />
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <ListGroup className="d-inline-flex" style={{}}>
        {confirmedInstructions.map((instruction, index) => (
          <ListGroup.Item
            key={index}
            className="text-wrap instruction-list-item"
            style={{ backgroundColor: "transparent" }}
          >
            {instruction}
          </ListGroup.Item>
        ))}
      </ListGroup> */}
    </>
  );
}
