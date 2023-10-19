import { useConwayEngine } from "../../contexts/ConwayEngineContext";
import GamePixel from "./GamePixel";

function GamePixelList() {
  const { widthQuantity, heightQuantity, alivePixels } = useConwayEngine();

  const pixelList = Array.from(
    { length: widthQuantity * heightQuantity },
    (value, index) => index + 1
  ).map((pixel, index) => {
    return (
      <GamePixel
        xPosition={(index % widthQuantity) + 1}
        yPosition={Math.floor(index / widthQuantity) + 1}
        isAlive={alivePixels.some(
          (anAlivePixel) =>
            anAlivePixel.xPosition === (index % widthQuantity) + 1 &&
            anAlivePixel.yPosition === Math.floor(index / widthQuantity) + 1
        )}
        key={index}
      />
    );
  });

  return <div>{pixelList}</div>;
}

export default GamePixelList;
