import { useEffect, useRef, useState } from "react";
import { usePlayer } from "./GoldenEye/PlayerContext";
import { useLayout } from "./GoldenEye/LayoutContext";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Bingo from "./GoldenEye/Bingo";
import Home from "./GoldenEye/Home";
import backgroundImageHome from "./GoldenEye/images/adultbingohomepage.png";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { MdOutlineTv } from "react-icons/md";

export default function GoldenEyeEnt() {
  const [key, setKey] = useState("home");
  const { togglePlay, playing } = usePlayer();
  const playlistID = "PL1BxR11Ysr38El0FTUAraiFLxyYeHUhl6";
  const [showVideo, setShowVideo] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const { setNavbarHeight } = useLayout();

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.clientHeight);
    }
  }, [setNavbarHeight]);

  const showVideoOnHome = () => {
    setShowVideo(!showVideo);
    setKey("home");
  };

  return (
    <>
      <Nav
        ref={navbarRef}
        variant="underline"
        // className="position-fixed top-0 w-100 align-items-center ge-nav-bar"
        className={`align-items-center ge-nav-bar ${
          key === "home" ? "position-fixed top-0 w-100" : "position-sticky "
        }`}
        activeKey={key}
        onSelect={(selectedKey) => setKey(selectedKey || "bingo")}
      >
        <Nav.Item>
          <Nav.Link disabled className="nav-logo pb-0">
            GoldenEye Entertainment
          </Nav.Link>
        </Nav.Item>

        <div className="d-none d-md-flex ms-auto">
          <Button
            title="toggle sound"
            variant="glass"
            className="circle yt-nav-btn"
            onClick={togglePlay}
          >
            {!playing ? <BsPlayFill /> : <BsPauseFill />}
          </Button>
          <Button
            title="show video"
            variant="glass"
            className="circle yt-nav-btn"
            onClick={showVideoOnHome}
          >
            <MdOutlineTv />
          </Button>
        </div>

        <Nav.Item>
          <Nav.Link eventKey="home" onClick={() => setKey("home")}>
            home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="bingo" onClick={() => setKey("bingo")}>
            bingo
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className={`tab-content ${key === "bingo" ? "d-block" : "d-none"}`}>
        <Bingo />
      </div>

      <div
        className={`tab-content ${key === "home" ? "d-block" : "d-none"}`}
        style={{
          backgroundImage: `url(${backgroundImageHome})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Home
          playlistID={playlistID}
          showVideo={showVideo}
          setShowVideo={setShowVideo}
        />
      </div>
    </>
  );
}
