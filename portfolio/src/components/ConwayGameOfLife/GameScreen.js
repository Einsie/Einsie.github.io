function GameScreen({ width, height, pixelList }) {
  const GameScreenStyle = {
    width: `${width * 30}px`,
    height: `${height * 30}px`,
    margin: "auto",
  };

  return <div style={GameScreenStyle}>{pixelList.map((pixel) => pixel)}</div>;
}

export default GameScreen;
