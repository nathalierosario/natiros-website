import { PlayerProvider } from "./components/GoldenEye/PlayerContext";
import { LayoutProvider } from "./components/GoldenEye/LayoutContext";
import GoldenEyeEnt from "./components/GoldenEyeEnt";

function App() {
  return (
    <PlayerProvider>
      <LayoutProvider>
        <GoldenEyeEnt />
      </LayoutProvider>
    </PlayerProvider>
  );
}

export default App;
