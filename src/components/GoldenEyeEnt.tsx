import { useEffect, useRef, useState } from "react";
import { usePlayer } from "./GoldenEye/PlayerContext";
import { useLayout } from "./GoldenEye/LayoutContext";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Bingo from "./GoldenEye/Bingo";
import Home from "./GoldenEye/Home";
import backgroundImageHome from "./GoldenEye/images/adultbingohomepage.png";
import { BsPauseFill, BsPlayFill, BsX } from "react-icons/bs";
import { MdOutlineTv, MdMenu } from "react-icons/md";

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

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <>
      {/* Sidebar contents for smaller screens */}
      <div className={`d-flex flex-column align-items-center sidebar ${isSidebarVisible ? "show" : ""}`}>
        <Button variant="glass circle" onClick={() => setIsSidebarVisible(false)}>
          <BsX />
        </Button>
        <Nav.Link eventKey="home" onClick={() => setKey("home")}>
          home
        </Nav.Link>
        <Nav.Link eventKey="bingo" onClick={() => setKey("bingo")}>
          bingo
        </Nav.Link>
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


      {/* Navbar */}
      <Nav
        ref={navbarRef}
        variant="underline"
        className={`align-items-center justify-content-between px-4 ge-nav-bar ${
          key === "home" ? "position-fixed top-0 w-100" : "position-sticky bingo"
        }`}
        activeKey={key}
        onSelect={(selectedKey) => setKey(selectedKey || "bingo")}
      >
        

        {/* Navbar logo */}
        <Nav.Item>
          <Nav.Link as={"h1"} disabled className="nav-logo my-0 py-0">
            GoldenEye Entertainment
          </Nav.Link>
        </Nav.Item>
        
        
        {/* Sidebar button to toggle on smaller screens */}
        <Button
          variant="glass circle"
          className="sidebar-toggle d-md-none"
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          <MdMenu />
        </Button>


        {/* Navbar Links */}
        <div className="d-none d-md-flex align-items-center">
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
          <Nav.Item className="px-3">
            <Nav.Link eventKey="home" onClick={() => setKey("home")}>
              home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="bingo" onClick={() => setKey("bingo")}>
              bingo
            </Nav.Link>
          </Nav.Item>
        </div>
      </Nav>

      {/* Actual tabs that display each page */}
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
