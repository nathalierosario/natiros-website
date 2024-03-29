import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type DropdownMenuProps = {
  playlistID: string;
  setPlaylistID: React.Dispatch<React.SetStateAction<string>>;
};

export default function ChangePlaylist({
  playlistID,
  setPlaylistID,
}: DropdownMenuProps) {
  const [youtubeURL, setYoutubeURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeURL(e.target.value);

    if (errorMsg) {
      setErrorMsg("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newPlaylistID: string = extractPlaylistID(youtubeURL);

    if (newPlaylistID) {
      setPlaylistID(newPlaylistID);
      setShowModal(false);
    } else {
      setErrorMsg("Trouble loading the playlist, please enter another URL.");
    }
  };

  const extractPlaylistID = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      return params.get("list") || "";
    } catch (error) {
      console.error("Invalid URL");
      return "";
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (errorMsg) {
      setPlaylistID(playlistID);
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="pop-buttons" onClick={toggleModal}>
        change playlist
      </div>

      <Modal
        show={showModal}
        onHide={handleModalClose}
        onClick={handleModalClick}
        centered
      >
        <Modal.Header className="text-center" closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="youtubePlaylistInput">
              <Form.Control
                type="text"
                placeholder="enter YouTube playlist URL"
                value={youtubeURL}
                onChange={handleURLChange}
                isInvalid={!!errorMsg}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errorMsg}
              </Form.Control.Feedback>
            </Form.Group>
            <Button className="mt-4" variant="simple" type="submit">
              submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
