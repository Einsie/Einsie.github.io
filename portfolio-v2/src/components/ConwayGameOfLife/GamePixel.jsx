import { useConwayEngine } from "../../hooks/useConwayEngine";

function GamePixel({ isAlive, xPosition, yPosition }) {
  const {
    widthQuantity: width,
    heightQuantity: height,
    dispatch,
  } = useConwayEngine();

  const pixelStyleIsDead = {
    backgroundColor: "white",
    width: `${100 / width}%`,
    paddingTop: `clamp(0.1px, ${height}vh, ${0.01}vw)`,
    display: "inline-block",
  };
  const pixelStyleIsAlive = {
    backgroundColor: "black",
    width: `${100 / width}%`,
    paddingTop: `clamp(0.1px, ${height}vh, ${0.01}vw)`,
    display: "inline-block",
  };
  const spanFillerStyle = {
    display: "inline-block",
  };

  return (
    <div
      style={isAlive ? pixelStyleIsAlive : pixelStyleIsDead}
      onClick={() =>
        dispatch({
          type: "setIsAlive",
          payload: { xPosition: xPosition, yPosition: yPosition },
        })
      }
      onMouseOver={(event) =>
        event.ctrlKey
          ? dispatch({
              type: "setIsAlive",
              payload: { xPosition: xPosition, yPosition: yPosition },
            })
          : event.preventDefault()
      }
    >
      <span style={spanFillerStyle}></span>
    </div>
  );
}

export default GamePixel;
