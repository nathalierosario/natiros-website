import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdMenu } from "react-icons/md";

type DropdownMenuProps = {
  setPlaylistID: React.Dispatch<React.SetStateAction<string>>;
};

export default function DropdownMenu({ setPlaylistID }: DropdownMenuProps) {
  const [youtubeURL, setYoutubeURL] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeURL(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newPlaylistID: string = extractPlaylistID(youtubeURL);

    if (newPlaylistID) {
      setPlaylistID(newPlaylistID);
    } else {
      console.log("no valid playlist id found in the url");
    }
  };

  const extractPlaylistID = (url: string): string => {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    return params.get("list") || "";
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="glass circle">
          <MdMenu />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={toggleModal}>
            enter YouTube Playlist URL
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header className="text-center" closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="youtubePlaylistInput">
              <Form.Control
                type="text"
                placeholder="Enter YouTube playlist URL"
                value={youtubeURL}
                onChange={handleURLChange}
                required
              />
            </Form.Group>
            <Button
              className="mt-4"
              variant="simple"
              type="submit"
              onClick={toggleModal}
            >
              submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
