function GameScreen({ width, height, pixelList }) {
  const GameScreenStyle = {
    width: `${width * 1.5}vw`,
    height: `${height * 3}vh`,
    margin: "auto",
    marginTop: "5px",
  };

  return <div style={GameScreenStyle}>{pixelList.map((pixel) => pixel)}</div>;
}

export default GameScreen;
