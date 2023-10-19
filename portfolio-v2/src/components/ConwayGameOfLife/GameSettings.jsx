import { useConwayEngine } from "../../contexts/ConwayEngineContext";

function GameSettings() {
  const { widthQuantity, heightQuantity, gameSpeedMultiplier, dispatch } =
    useConwayEngine();

  return (
    <div>
      <p>Max width and height is 100</p>
      <span>Width: </span>
      <input
        value={widthQuantity}
        onChange={(event) =>
          dispatch({
            type: "setWidthQuantity",
            payload: event.target.value,
          })
        }
      />
      <br />
      <span>Height: </span>
      <input
        value={heightQuantity}
        onChange={(event) =>
          dispatch({
            type: "setHeightQuantity",
            payload: event.target.value,
          })
        }
      />
      <p>Game speed multiplier:</p>
      <button
        onClick={() =>
          dispatch({ type: "setGameSpeed", payload: gameSpeedMultiplier - 1 })
        }
        disabled={gameSpeedMultiplier === 1}
      >
        -
      </button>
      <span>{gameSpeedMultiplier}</span>
      <button
        onClick={() =>
          dispatch({ type: "setGameSpeed", payload: gameSpeedMultiplier + 1 })
        }
        disabled={gameSpeedMultiplier === 5}
      >
        +
      </button>
      <br />
      <br />
    </div>
  );
}

export default GameSettings;
