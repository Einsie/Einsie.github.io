import { useReducer } from "react";
import GameScreen from "../components/ConwayGameOfLife/GameScreen";
import GamePixel from "../components/ConwayGameOfLife/GamePixel";
import Timer from "../components/ConwayGameOfLife/Timer";
import ProjectContainer from "../components/BasicCustomComponents/ProjectContainer";

/*
Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
These rules, which compare the behaviour of the automaton to real life, can be condensed into the following:

Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/

const initialState = {
  widthQuantity: 5,
  heightQuantity: 5,
  isRunning: false,
  secondsRunning: 0,
  pixels: Array.from(
    { length: 25 },
    (value, index) =>
      (value = {
        isAlive: false,
        xPosition: (index % 5) + 1,
        yPosition: Math.floor(index / 5) + 1,
      })
  ),
  status: "ready",
};

function reducer(state, action) {
  switch (action.type) {
    case "setIsRunning":
      return {
        ...state,
        isRunning: !state.isRunning,
      };
    case "setWidthQuantity": {
      if (
        isNaN(Number(action.payload)) ||
        (!isNaN(Number(action.payload)) && Number(action.payload) < 0)
      )
        return state;

      const newWidthQuantity =
        Number(action.payload) <= 30 ? Number(action.payload) : 30;

      return {
        ...state,
        widthQuantity: newWidthQuantity,
        pixels: Array.from(
          { length: newWidthQuantity * state.heightQuantity },
          (value, index) =>
            (value = {
              isAlive: false,
              xPosition: (index % state.widthQuantity) + 1,
              yPosition: Math.floor(index / state.widthQuantity) + 1,
            })
        ),
      };
    }
    case "setHeightQuantity": {
      if (
        isNaN(Number(action.payload)) ||
        (!isNaN(Number(action.payload)) && Number(action.payload) < 0)
      )
        return state;

      const newHeightQuantity =
        Number(action.payload) <= 30 ? Number(action.payload) : 30;

      return {
        ...state,
        heightQuantity: newHeightQuantity,
        pixels: Array.from(
          { length: newHeightQuantity * state.widthQuantity },
          (value, index) =>
            (value = {
              isAlive: false,
              xPosition: (index % state.widthQuantity) + 1,
              yPosition: Math.floor(index / state.widthQuantity) + 1,
            })
        ),
      };
    }
    case "setIsAlive":
      return {
        ...state,
        pixels: state.pixels.map((pixel, index) =>
          index === action.payload
            ? { ...pixel, isAlive: !pixel.isAlive }
            : pixel
        ),
      };
    case "resetPixels":
      return {
        ...state,
        pixels: state.pixels.map((pixel) => {
          return { ...pixel, isAlive: false };
        }),
        secondsRunning: 0,
        isRunning: false,
      };
    case "resetGame":
      return initialState;
    case "timerTick": {
      const newPixels = state.pixels.map((primaryPixel, primaryIndex) => {
        const aliveNeighbours = state.pixels.reduce(
          (acc, cur, index) =>
            index === primaryIndex
              ? acc
              : cur.xPosition <= primaryPixel.xPosition + 1 &&
                cur.xPosition >= primaryPixel.xPosition - 1 &&
                cur.yPosition <= primaryPixel.yPosition + 1 &&
                cur.yPosition >= primaryPixel.yPosition - 1 &&
                cur.isAlive
              ? acc + 1
              : acc,
          0
        );

        const pixelNewAliveState =
          aliveNeighbours === 2
            ? primaryPixel.isAlive
            : aliveNeighbours === 3
            ? true
            : false;

        return { ...primaryPixel, isAlive: pixelNewAliveState };
      });

      return {
        ...state,
        secondsRunning: state.secondsRunning + 1,
        pixels: newPixels,
      };
    }
    default:
      throw new Error("Unkown reducer action");
  }
}

function ConwayGameOfLife() {
  const [
    { widthQuantity, heightQuantity, isRunning, secondsRunning, pixels },
    dispatch,
  ] = useReducer(reducer, initialState);

  const pixelList = Array.from(
    { length: widthQuantity * heightQuantity },
    (value, index) => index + 1
  ).map((pixel, index) => {
    return (
      <GamePixel
        index={index}
        xPosition={(index % widthQuantity) + 1}
        yPosition={Math.floor(index / widthQuantity) + 1}
        isAlive={pixels[index]?.isAlive}
        dispatch={dispatch}
        key={index}
        pixelDimensions={{
          width: widthQuantity * 3,
          height: heightQuantity * 3,
        }}
      />
    );
  });

  return (
    <ProjectContainer>
      <h1>Iconic Conways Game of Life done in React</h1>
      <h4>
        To play the game, click pixels to turn them alive. Then click the start
        the game button
      </h4>
      <h4>
        You can also hold down control key and hover over pixels to turn them
        alive and drag as you wish.
      </h4>
      <br />
      <p>Max width and height is 30</p>
      <span>Width: </span>
      <input
        value={widthQuantity}
        onChange={(event) =>
          dispatch({ type: "setWidthQuantity", payload: event.target.value })
        }
        disabled={isRunning}
      />
      <br />
      <span>Height: </span>
      <input
        value={heightQuantity}
        onChange={(event) =>
          dispatch({ type: "setHeightQuantity", payload: event.target.value })
        }
        disabled={isRunning}
      />
      <br />
      <br />
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
      <Timer
        dispatch={dispatch}
        isRunning={isRunning}
        secondsRunning={secondsRunning}
      />
      <GameScreen
        width={widthQuantity}
        height={heightQuantity}
        pixelList={pixelList}
      />
      <p>aa</p>
    </ProjectContainer>
  );
}

export default ConwayGameOfLife;
