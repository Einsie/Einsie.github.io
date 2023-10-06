function GamePixel({ index, isAlive, dispatch, pixelDimensions }) {
  const pixelStyleIsDead = {
    backgroundColor: "white",
    width: `${pixelDimensions.width}%`,
    height: `${pixelDimensions.height}%`,
    marginTop: "-2.2px",
  };
  const pixelStyleIsAlive = {
    backgroundColor: "black",
    width: `${pixelDimensions.width}%`,
    height: `${pixelDimensions.height}%`,
    marginTop: "-2.2px",
  };

  return (
    <button
      style={isAlive ? pixelStyleIsAlive : pixelStyleIsDead}
      onClick={() => dispatch({ type: "setIsAlive", payload: index })}
      onMouseOver={(event) =>
        event.ctrlKey
          ? dispatch({ type: "setIsAlive", payload: index })
          : event.preventDefault()
      }
    />
  );
}

export default GamePixel;
