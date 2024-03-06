import Button from "react-bootstrap/Button";
import YoutubePlayer from "./YoutubePlayer";
// import { useLayout } from "./LayoutContext";
import React from "react";
import { BsX } from "react-icons/bs";

interface GEHomeProps {
  playlistID: string;
  showVideo: boolean;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GEHome({
  playlistID,
  showVideo,
  setShowVideo,
}: GEHomeProps) {
  // const { navbarHeight } = useLayout();

  const handleClose = () => {
    setShowVideo(false);
  };
  return (
    <div
      className={`modal-dupe ${showVideo ? "active" : ""}`}
      // style={{ paddingTop: navbarHeight }}
    >
      <div
        className="modal-content"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <YoutubePlayer playlistID={playlistID} />
        <Button
          variant="glass"
          className="align-self-center circle"
          aria-label="Close"
          onClick={handleClose}
          style={{ width: "3%" }}
        >
          <BsX size={"2rem"} />
        </Button>
      </div>
    </div>
  );
}
