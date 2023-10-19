import { useConwayEngine } from "../../hooks/useConwayEngine";

function GameSettings() {
  const {
    widthQuantity,
    heightQuantity,
    gameSpeedMultiplier,
    xPositionOffSet,
    yPositionOffSet,
    dispatch,
  } = useConwayEngine();

  return (
    <div>
      <p>Max width and height is 50</p>
      <span>Width: </span>
      <button
        onClick={() =>
          dispatch({ type: "setWidthQuantity", payload: widthQuantity - 1 })
        }
      >
        -
      </button>
      <input
        value={widthQuantity}
        onChange={(event) =>
          dispatch({
            type: "setWidthQuantity",
            payload: event.target.value,
          })
        }
      />
      <button
        onClick={() =>
          dispatch({ type: "setWidthQuantity", payload: widthQuantity + 1 })
        }
      >
        +
      </button>
      <br />
      <span>Height: </span>
      <button
        onClick={() =>
          dispatch({ type: "setHeightQuantity", payload: widthQuantity - 1 })
        }
      >
        -
      </button>
      <input
        value={heightQuantity}
        onChange={(event) =>
          dispatch({
            type: "setHeightQuantity",
            payload: event.target.value,
          })
        }
      />
      <button
        onClick={() =>
          dispatch({ type: "setHeightQuantity", payload: widthQuantity + 1 })
        }
      >
        +
      </button>
      <p>The range for x- and y-position offset is from -50 to 50</p>
      <span>x-position offset: </span>
      <button
        onClick={() =>
          dispatch({ type: "setXPositionOffSet", payload: xPositionOffSet - 1 })
        }
      >
        -
      </button>
      <input
        value={xPositionOffSet}
        onChange={(event) =>
          dispatch({
            type: "setXPositionOffSet",
            payload: event.target.value,
          })
        }
      />
      <button
        onClick={() =>
          dispatch({ type: "setXPositionOffSet", payload: xPositionOffSet + 1 })
        }
      >
        +
      </button>
      <br />
      <span>y-position offset: </span>
      <button
        onClick={() =>
          dispatch({ type: "setYPositionOffSet", payload: yPositionOffSet - 1 })
        }
      >
        -
      </button>
      <input
        value={yPositionOffSet}
        onChange={(event) =>
          dispatch({
            type: "setYPositionOffSet",
            payload: event.target.value,
          })
        }
      />
      <button
        onClick={() =>
          dispatch({ type: "setYPositionOffSet", payload: yPositionOffSet + 1 })
        }
      >
        +
      </button>
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
