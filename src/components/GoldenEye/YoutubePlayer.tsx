declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

import { useEffect } from "react";
import { useRef } from "react";

interface YoutubePlayerProps {
  playlistID: string;
  player: YT.Player | null;
  setPlayer: React.Dispatch<React.SetStateAction<YT.Player | null>>;
}

export default function YoutubePlayer({
  playlistID,
  player,
  setPlayer,
}: YoutubePlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializePlayer = () => {
      if (playerRef.current && !player) {
        // Check if the div exists and no player has been initialized yet
        new YT.Player(playerRef.current, {
          playerVars: {
            listType: "playlist",
            list: playlistID,
          },

          events: {
            onReady: (event) => {
              setPlayer(event.target); // Update the parent component's state with the new player instance
            },
            // You can add more event handlers here
          },
        });
      }
    };

    // Dynamically load the YouTube IFrame API script if it hasn't been loaded yet
    if (!window.YT) {
      // Check if the YT object is not present
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      // Define the global onYouTubeIframeAPIReady function that YouTube will call once the API script is loaded
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else if (!player) {
      // If the API is already loaded but no player is initialized, initialize the player
      initializePlayer();
    }
  }, [playlistID, player, setPlayer]);

  return (
    <div className="d-flex justify-content-center">
      <div>
        <div ref={playerRef} className="player-container"></div>
      </div>
    </div>
  );
}
