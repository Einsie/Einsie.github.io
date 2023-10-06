function GameScreen({ width, height, pixelList }) {
  const GameScreenStyle = {
    width: `${width * 3}vw`,
    height: `${height * 3}vh`,
    margin: "auto",
  };

  return <div style={GameScreenStyle}>{pixelList.map((pixel) => pixel)}</div>;
}

export default GameScreen;
