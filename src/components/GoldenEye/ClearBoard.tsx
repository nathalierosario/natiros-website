import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type ClearBoardProps = {
  resetBoard: () => void;
};

export default function ClearBoard({ resetBoard }: ClearBoardProps) {
  const [showClearBoardAlert, setShowClearBoardAlert] =
    useState<boolean>(false);

  const handleConfirm = () => {
    resetBoard();
    setShowClearBoardAlert(false);
  };

  return (
    <>
      <Button
        size="sm"
        variant="simple"
        className="rounded"
        style={{
          borderColor: "transparent",
        }}
        onClick={() => setShowClearBoardAlert(true)}
      >
        clear board
      </Button>

      <Modal
        className="text-center"
        backdrop="static"
        show={showClearBoardAlert}
        onHide={() => setShowClearBoardAlert(false)}
        centered
      >
        <Modal.Header className="text-center" closeButton>
          <Modal.Title className="w-100 text-center">clear board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            "are you sure you want to clear the board? this action cannot be undone."
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="glass" onClick={() => setShowClearBoardAlert(false)}>
            cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
