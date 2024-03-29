import React, { useEffect, useRef } from "react";
import { usePlayer } from "./PlayerContext";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

const YoutubePlayer: React.FC<{ playlistID: string }> = ({ playlistID }) => {
  const { playing, togglePlay, showVideo, toggleShowVideo } = usePlayer();
  const playerRef = useRef<any>(null);
  const playingRef = useRef(playing);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

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

    const onPlayerStateChange = (event: any) => {
      switch (event.data) {
        case window.YT.PlayerState.PLAYING:
          if (!playingRef.current) togglePlay();
          break;
        case window.YT.PlayerState.PAUSED:
        case window.YT.PlayerState.ENDED:
          if (playingRef.current) togglePlay();
          break;
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
            onStateChange: onPlayerStateChange,
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
    <div
      className="video-overlay"
      onClick={toggleShowVideo}
      style={{ display: showVideo ? "" : "none" }}
    >
      <div
        className="youtube-player ratio ratio-16x9"
        onClick={(event) => event.stopPropagation()}
      >
        <div id="player"></div>
      </div>
    </div>
  );
};

export default YoutubePlayer;
