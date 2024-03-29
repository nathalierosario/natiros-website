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
import DropdownMenu from "./GoldenEye/ChangePlaylist";
import Extras from "./GoldenEye/Extras";
import PlayControls from "./GoldenEye/PlayControls";

export default function GoldenEyeEnt() {
  const [key, setKey] = useState("home");
  const { playing, togglePlay, toggleShowVideo } = usePlayer();
  const defaultPlaylistID = "PL1BxR11Ysr38El0FTUAraiFLxyYeHUhl6";
  const [playlistID, setPlaylistID] = useState(defaultPlaylistID);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const { setNavbarHeight } = useLayout();
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.clientHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);

    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, [setNavbarHeight]);

  const showVideoOnHome = () => {
    toggleShowVideo();
    setKey("home");
  };

  useEffect(() => {
    const handleResize = () => {
      const desktopBreakpoint = 768;

      if (window.innerWidth >= desktopBreakpoint) {
        setIsSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Sidebar contents for smaller screens */}
      <div
        style={{ fontSize: "8vw" }}
        className={`d-flex flex-column align-items-center sidebar ${
          isSidebarVisible ? "show" : ""
        }`}
      >
        <Button
          variant="glass circle mb-5"
          onClick={() => setIsSidebarVisible(false)}
        >
          <BsX />
        </Button>
        <Nav.Link eventKey="home" onClick={() => setKey("home")}>
          home
        </Nav.Link>
        <Nav.Link eventKey="bingo" onClick={() => setKey("bingo")}>
          bingo
        </Nav.Link>
        <div className="d-flex">
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
      </div>

      {/* Navbar shown on larger screens*/}
      <Nav
        ref={navbarRef}
        className={`align-items-center justify-content-between px-4 ge-nav-bar ${
          key !== "bingo" ? "position-fixed top-0 w-100" : "position-sticky"
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

        {/* Sidebar menu button to toggle on smaller screens */}
        <Button
          variant="glass circle"
          className="sidebar-toggle d-md-none"
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          <MdMenu />
        </Button>

        {/* Navbar Links */}
        <div className="navbar-linkz rounded-pill d-none d-md-flex align-items-center">
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
          <Nav.Item>
            <Nav.Link eventKey="extras" onClick={() => setKey("extras")}>
              extras
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
        <Home playlistID={playlistID} />
      </div>

      <div
        className={`tab-content extras-tab ${
          key === "extras" ? "d-block" : "d-none"
        }`}
      >
        <Extras />
      </div>

      <PlayControls
        showVideoOnHome={showVideoOnHome}
        playlistID={playlistID}
        setPlaylistID={setPlaylistID}
      />
    </>
  );
}
