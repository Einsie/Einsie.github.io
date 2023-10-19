import { useConwayEngine } from "../../hooks/useConwayEngine";
import GamePixel from "./GamePixel";

function GamePixelList() {
  const {
    widthQuantity,
    heightQuantity,
    xPositionOffSet,
    yPositionOffSet,
    alivePixels,
  } = useConwayEngine();

  const pixelList = Array.from(
    { length: widthQuantity * heightQuantity },
    (value, index) => index + 1
  ).map((pixel, index) => {
    return (
      <GamePixel
        xPosition={(index % widthQuantity) + 1 + xPositionOffSet}
        yPosition={Math.floor(index / widthQuantity) + 1 + yPositionOffSet}
        isAlive={alivePixels.some(
          (anAlivePixel) =>
            anAlivePixel.xPosition ===
              (index % widthQuantity) + 1 + xPositionOffSet &&
            anAlivePixel.yPosition ===
              Math.floor(index / widthQuantity) + 1 + yPositionOffSet
        )}
        key={index}
      />
    );
  });

  return <div>{pixelList}</div>;
}

export default GamePixelList;
