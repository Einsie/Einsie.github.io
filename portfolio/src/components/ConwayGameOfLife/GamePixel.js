const pixelStyleIsDead = {
  backgroundColor: "white",
  width: "30px",
  height: "30px",
  marginTop: "-2.2px",
};
const pixelStyleIsAlive = {
  backgroundColor: "black",
  width: "30px",
  height: "30px",
  marginTop: "-2.2px",
};

function GamePixel({ index, isAlive, dispatch }) {
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
