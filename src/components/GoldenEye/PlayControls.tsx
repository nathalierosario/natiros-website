import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { MdOutlineTv } from "react-icons/md";
import { usePlayer } from "./PlayerContext";
import ChangePlaylist from "./ChangePlaylist";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

type PlayControlsProps = {
  showVideoOnHome: () => void;
  playlistID: string;
  setPlaylistID: React.Dispatch<React.SetStateAction<string>>;
};

export default function PlayControls({
  showVideoOnHome,
  playlistID,
  setPlaylistID,
}: PlayControlsProps) {
  const { togglePlay, playing } = usePlayer();
  const [showPopover, setShowPopover] = useState(false);

  const popover = (
    <Popover id="play-controls-popover">
      <Popover.Body>
        <div className="pop-options-list">
          <div className="pop-option">
            <div
              className="pop-buttons"
              onClick={() => {
                showVideoOnHome();
                setShowPopover(false);
              }}
            >
              show video
            </div>
            <FaArrowLeft className="pop-arrow" />
          </div>
          <div className="pop-option">
            <ChangePlaylist
              playlistID={playlistID}
              setPlaylistID={(id) => {
                setPlaylistID(id);
                setShowPopover(false);
              }}
            />
            <FaArrowLeft className="pop-arrow" />
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="play-controls rounded-pill p-3">
      <Button
        title="toggle sound"
        variant="glass"
        className="circle yt-nav-btn"
        onClick={togglePlay}
      >
        {!playing ? <BsPlayFill /> : <BsPauseFill />}
      </Button>
      <OverlayTrigger
        show={showPopover}
        rootClose
        trigger="click"
        placement="top"
        overlay={popover}
        onToggle={(isVisible) => setShowPopover(isVisible)}
      >
        <Button
          title="video options"
          variant="glass"
          className="circle yt-nav-btn"
          onClick={() => setShowPopover(!showPopover)}
        >
          <MdOutlineTv />
        </Button>
      </OverlayTrigger>
    </div>
  );
}
