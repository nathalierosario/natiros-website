import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Bingo from "./GoldenEye/Bingo";
import GEHome from "./GoldenEye/Home";
import backgroundImageHome from "./GoldenEye/images/adultbingohomepage.png";
import backgroundImageDim from "./GoldenEye/images/adultbingohomepage-dim.png";

export default function GoldenEyeEnt() {
  const [key, setKey] = useState("bingo");
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
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
    <>
      <Nav
        className="justify-content-between align-items-center my-2 ge-tab-bar"
        activeKey={key}
        onSelect={(selectedKey) => setKey(selectedKey || "bingo")}
      >
        <Nav.Item className="">
          <Nav.Link className="nav-logo fs-1">GoldenEye Entertainment</Nav.Link>
        </Nav.Item>

        <div className="d-flex">
          <Nav.Item>
            <Nav.Link eventKey="bingo" className="justify-content-end">
              bingo
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="home">home</Nav.Link>
          </Nav.Item>
        </div>
      </Nav>

      {key === "bingo" && (
        <Bingo togglePlayback={togglePlayback} isPlaying={isPlaying} />
      )}

      {key === "home" && (
        <div
          style={{
            backgroundImage: `url(${
              showVideo ? backgroundImageDim : backgroundImageHome
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <GEHome
            playlistID={playlistID}
            player={player}
            setPlayer={setPlayer}
            showVideo={showVideo}
            setShowVideo={setShowVideo}
          />
        </div>
      )}
    </>
    // <Tabs
    //   variant="pills"
    //   className="justify-content-center ge-tab-bar my-2"
    //   data-bs-theme="dark"
    //   activeKey={key}
    //   onSelect={(k) => setKey(k || "bingo")}
    // >
    //   <Tab eventKey="bingo" title="bingo">
    //     <Bingo togglePlayback={togglePlayback} isPlaying={isPlaying} />
    //   </Tab>
    //   <Tab
    //     eventKey="home"
    //     title="home"
    //     style={{
    //       backgroundImage: `url(${!showVideo ? backgroundImageHome : backgroundImageDim})`,
    //       minHeight: "100vh",
    //       backgroundSize: "cover",
    //       backgroundPosition: "center",
    //     }}
    //   >
    //     <GEHome
    //       playlistID={playlistID}
    //       player={player}
    //       setPlayer={setPlayer}
    //       showVideo={showVideo}
    //       setShowVideo={setShowVideo}
    //     />
    //   </Tab>
    // </Tabs>
  );
}
