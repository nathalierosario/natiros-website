import React, { useEffect, useRef } from "react";
import { usePlayer } from "./PlayerContext";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

const YoutubePlayer: React.FC<{ playlistID: string }> = ({ playlistID }) => {
  const { playing } = usePlayer();
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const scriptId = "youtube-iframe-api";

    const loadYT = () => {
      if (!document.getElementById(scriptId)) {
        const tag = document.createElement("script");
        tag.id = scriptId;
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
      }
    };

    const initializePlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player("player", {
          playerVars: {
            listType: "playlist",
            list: playlistID,
            autoplay: 0,
          },
          events: {
            onReady: (event) => {
              event.target.setShuffle(true);
              event.target.playVideoAt(0);
            },
          },
        });
      }
    };

    if (!window["YT"]) {
      loadYT();
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        // playerRef.current = null;
      }
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, [playlistID]);

  useEffect(() => {
    if (playerRef.current) {
      playing ? playerRef.current.playVideo() : playerRef.current.pauseVideo();
    }
  }, [playing]);

  return (
    <div className="d-flex justify-content-center">
      <div className=" ratio ratio-16x9" style={{ width: "95%" }}>
        <div id="player"></div>
      </div>
    </div>
  );
};

export default YoutubePlayer;
