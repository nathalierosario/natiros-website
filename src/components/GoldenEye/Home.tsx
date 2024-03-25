import Button from "react-bootstrap/Button";
import YoutubePlayer from "./YoutubePlayer";
// import { useLayout } from "./LayoutContext";
import React from "react";
import { BsX } from "react-icons/bs";

interface GEHomeProps {
  playlistID: string;
}

export default function GEHome({ playlistID }: GEHomeProps) {
  return <YoutubePlayer playlistID={playlistID} />;
}
