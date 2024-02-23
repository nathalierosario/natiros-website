import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Bingo from "./GoldenEye/Bingo";
import GEHome from "./GoldenEye/GEHome";
import backgroundImageHome from "./GoldenEye/images/adultbingohomepage.png";

export default function GoldenEyeEnt() {
  const [key, setKey] = useState("bingo");
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playlistID = "PL1BxR11Ysr38El0FTUAraiFLxyYeHUhl6";

  const togglePlayback = () => {
    if (player) {
      const playerState = player.getPlayerState();
      if (playerState === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.playVideo();
        setIsPlaying(true);
      }
    }
  };

  return (
    <Tabs
      variant="pills"
      className="justify-content-center ge-tab-bar my-2"
      data-bs-theme="dark"
      activeKey={key}
      onSelect={(k) => setKey(k || "bingo")}
    >
      <Tab eventKey="bingo" title="bingo">
        <Bingo togglePlayback={togglePlayback} isPlaying={isPlaying} />
      </Tab>
      <Tab
        eventKey="home"
        title="home"
        style={{
          backgroundImage: `url(${backgroundImageHome})`,
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <GEHome playlistID={playlistID} player={player} setPlayer={setPlayer} />
      </Tab>
    </Tabs>
  );
}
