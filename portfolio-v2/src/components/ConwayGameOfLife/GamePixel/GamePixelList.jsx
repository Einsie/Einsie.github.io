import { useConwayEngine } from "../../../contexts/ConwayEngineContext";
import GamePixel from "./GamePixel";

function GamePixelList() {
  const {
    widthQuantity,
    heightQuantity,
    xPositionOffset,
    yPositionOffset,
    alivePixels,
  } = useConwayEngine();

  const pixelList = Array.from(
    { length: widthQuantity * heightQuantity },
    (value, index) => index + 1
  ).map((pixel, index) => {
    return (
      <GamePixel
        xPosition={(index % widthQuantity) + 1 + xPositionOffset}
        yPosition={Math.floor(index / widthQuantity) + 1 - yPositionOffset}
        isAlive={alivePixels.some(
          (anAlivePixel) =>
            anAlivePixel.xPosition ===
              (index % widthQuantity) + 1 + xPositionOffset &&
            anAlivePixel.yPosition ===
              Math.floor(index / widthQuantity) + 1 - yPositionOffset
        )}
        key={index}
      />
    );
  });

  return <div>{pixelList}</div>;
}

export default GamePixelList;
