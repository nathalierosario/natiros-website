import YoutubePlayer from "./YoutubePlayer";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { SiYoutubemusic } from "react-icons/si";

interface GEHomeProps {
  playlistID: string;
  player: YT.Player | null;
  setPlayer: React.Dispatch<React.SetStateAction<YT.Player | null>>;
  showVideo: boolean;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GEHome({
  playlistID,
  player,
  setPlayer,
  showVideo,
  setShowVideo,
}: GEHomeProps) {
  return (
    <div>
      {/* <div className="ge-logo" style={{ fontSize: "min(8vw, 8vh)" }}>
        GoldenEye Entertainment
      </div> */}
      <Button
        onClick={() => setShowVideo(!showVideo)}
        aria-controls="show-video-home"
        aria-expanded={showVideo}
      >
        <SiYoutubemusic style={{backgroundColor: "transparent"}} />
      </Button>
      <Collapse in={showVideo}>
        <div>
          <YoutubePlayer
            playlistID={playlistID}
            player={player}
            setPlayer={setPlayer}
          />
        </div>
      </Collapse>
    </div>
  );
}
