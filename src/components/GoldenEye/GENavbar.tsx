import "./GoldenEye.css"
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GELogo from "./images/GElogo.png";

export default function GENavbar() {
  return (
    <>
      <Tabs variant="pills" defaultActiveKey="home" className="justify-content-end ge-nav">
        <Tab eventKey="home" title="HOME" className="ge-tab">
          <h1>hello</h1>
        </Tab>
        <Tab eventKey="bingo" title="BINGO">
          <h1>hey</h1>
        </Tab>
      </Tabs>
    </>
  );
}
