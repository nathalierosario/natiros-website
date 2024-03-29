import YoutubePlayer from "./YoutubePlayer";

interface GEHomeProps {
  playlistID: string;
}

export default function GEHome({ playlistID }: GEHomeProps) {
  return <YoutubePlayer playlistID={playlistID} />;
}
