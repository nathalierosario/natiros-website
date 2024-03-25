import { createContext, useContext, useState, ReactNode } from "react";

interface PlayerContextType {
  playing: boolean;
  togglePlay: () => void;
  showVideo: boolean;
  toggleShowVideo: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [playing, setPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const togglePlay = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  const toggleShowVideo = () => {
    setShowVideo((prevShowVid) => !prevShowVid);
  };

  return (
    <PlayerContext.Provider
      value={{ playing, togglePlay, showVideo, toggleShowVideo }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be within provider");
  }

  return context;
};
