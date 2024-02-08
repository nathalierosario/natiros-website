import YoutubePlayer from "./YoutubePlayer";

interface GEHomeProps {
  playlistID: string;
  player: YT.Player | null;
  setPlayer: React.Dispatch<React.SetStateAction<YT.Player | null>>;
}

export default function GEHome({ playlistID, player, setPlayer }: GEHomeProps) {
  return (
    <YoutubePlayer
      playlistID={playlistID}
      player={player}
      setPlayer={setPlayer}
    />
  );
}
