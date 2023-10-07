function GamePixel({
  isAlive,
  dispatch,
  pixelDimensions,
  xPosition,
  yPosition,
}) {
  const pixelStyleIsDead = {
    backgroundColor: "white",
    width: `${pixelDimensions.width}%`,
    height: `${pixelDimensions.height}%`,
    marginTop: "-4.8px",
    display: "inline-block",
  };
  const pixelStyleIsAlive = {
    backgroundColor: "black",
    width: `${pixelDimensions.width}%`,
    height: `${pixelDimensions.height}%`,
    marginTop: "-4.8px",
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
    />
  );
}

export default GamePixel;
