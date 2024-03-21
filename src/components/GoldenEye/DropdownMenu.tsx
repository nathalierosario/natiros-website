import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdMenu } from "react-icons/md";

type DropdownMenuProps = {
  playlistID: string;
  setPlaylistID: React.Dispatch<React.SetStateAction<string>>;
};

export default function DropdownMenu({
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

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="glass" className="circle">
          <MdMenu />
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item onClick={toggleModal}>change playlist</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header className="text-center" closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="youtubePlaylistInput">
              <Form.Control
                type="text"
                placeholder="Enter YouTube playlist URL"
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
