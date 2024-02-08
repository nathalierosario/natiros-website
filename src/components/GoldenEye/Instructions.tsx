import { FormEvent, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { BsCheckLg } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import Collapse from "react-bootstrap/Collapse";

export default function Instructions() {
  const [instruction, setInstruction] = useState<string>("");
  const [confirmedInstructions, setConfirmedInstructions] = useState<string[]>(
    []
  );
  const [openForm, setOpenForm] = useState(false);

  const handleInstructionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstruction(e.target.value);
  };

  const handleConfirmedInstructions = (e?: FormEvent) => {
    e?.preventDefault();
    setConfirmedInstructions((prev) => [...prev, instruction]);

    setInstruction("");
  };

  return (
    <>
      <div>
        <Button
          onClick={() => setOpenForm(!openForm)}
          aria-controls="instruction-form"
          aria-expanded={openForm}
          style={{ backgroundColor: "transparent", borderColor: "transparent" }}
          title="instructions"
        >
          <BsChevronDown />
        </Button>
      </div>

      <Collapse in={openForm}>
        <div id="collapse-form">
          <Form onSubmit={handleConfirmedInstructions}>
            <Row className="g-0 px-3">
              <Col>
                <Form.Group controlId="instructionInput">
                  <Form.Control
                    type="text"
                    placeholder="instructions"
                    value={instruction}
                    onChange={handleInstructionChange}
                    autoComplete="off"
                    size="sm"
                    style={{ backgroundColor: "transparent" }}
                  />
                </Form.Group>
              </Col>
              <Col md="auto">
                <Button
                  type="submit"
                  onClick={handleConfirmedInstructions}
                  disabled={!instruction.trim()}
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                  }}
                >
                  <BsCheckLg size={"1em"} />
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Collapse>

      <ListGroup variant="flush" className="d-inline-flex" style={{}}>
        {confirmedInstructions.map((instruction, index) => (
          <ListGroup.Item
            key={index}
            className="text-wrap instruction-list-item"
            style={{ backgroundColor: "transparent" }}
          >
            {instruction}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
