import { useConwayEngine } from "../../contexts/ConwayEngineContext";

function GameControls() {
  const { widthQuantity, heightQuantity, isRunning, dispatch } =
    useConwayEngine();

  return (
    <div>
      <button
        onClick={() => dispatch({ type: "setIsRunning" })}
        disabled={widthQuantity === 0 || heightQuantity === 0}
      >
        {isRunning ? "Pause" : "Start game"}
      </button>
      <button onClick={() => dispatch({ type: "resetPixels" })}>
        Reset pixels
      </button>
      <button onClick={() => dispatch({ type: "resetGame" })}>
        Reset game
      </button>
      <br />
      <br />
    </div>
  );
}

export default GameControls;
