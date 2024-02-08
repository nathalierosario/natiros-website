import { BsPlayFill } from "react-icons/bs";
import { BsPauseFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";

interface PlaybackProps {
  togglePlayback: () => void;
  isPlaying: boolean;
}

export default function Playback({ togglePlayback, isPlaying }: PlaybackProps) {
  return (
    <Button
      style={{ backgroundColor: "transparent", borderColor: "transparent" }}
      onClick={togglePlayback}
    >
      {isPlaying ? (
        <BsPauseFill color="red" size={"3em"} />
      ) : (
        <BsPlayFill color="red" size={"3em"} />
      )}
    </Button>
  );
}
