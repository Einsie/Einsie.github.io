import { useConwayEngine } from "../../contexts/ConwayEngineContext";
import GamePixelList from "./GamePixel/GamePixelList";

function GameScreen() {
  const { widthQuantity } = useConwayEngine();

  const GameScreenStyle = {
    width: `${widthQuantity * 2}vw`,
    maxWidth: "80vw",
    margin: "auto",
    marginTop: "5px",
  };

  return (
    <div style={GameScreenStyle}>
      <GamePixelList />
    </div>
  );
}

export default GameScreen;
