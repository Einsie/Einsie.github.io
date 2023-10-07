import { useReducer } from "react";
import GameScreen from "../components/ConwayGameOfLife/GameScreen";
import GamePixel from "../components/ConwayGameOfLife/GamePixel";
import Timer from "../components/ConwayGameOfLife/Timer";
import ProjectContainer from "../components/BasicCustomComponents/ProjectContainer";
import NavBar from "../components/BasicCustomComponents/NavBar";

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
  alivePixels: [],
  status: "ready",
  gameSpeed: 1,
};

const BASE_GAMESPEED = 1000;

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
        Number(action.payload) <= 50 ? Number(action.payload) : 50;

      return {
        ...state,
        widthQuantity: newWidthQuantity,
      };
    }
    case "setHeightQuantity": {
      if (
        isNaN(Number(action.payload)) ||
        (!isNaN(Number(action.payload)) && Number(action.payload) < 0)
      )
        return state;

      const newHeightQuantity =
        Number(action.payload) <= 50 ? Number(action.payload) : 50;

      return {
        ...state,
        heightQuantity: newHeightQuantity,
      };
    }
    case "setGameSpeed": {
      if (
        isNaN(Number(action.payload)) ||
        (!isNaN(Number(action.payload)) && Number(action.payload) < 0)
      )
        return state;

      const newGameSpeed =
        Number(action.payload) > 0
          ? Number(action.payload) <= 5
            ? Number(action.payload)
            : 5
          : 1;

      return {
        ...state,
        gameSpeed: newGameSpeed,
      };
    }
    case "setIsAlive":
      return {
        ...state,
        alivePixels: state.alivePixels.some(
          (pixel) =>
            pixel.xPosition === action.payload.xPosition &&
            pixel.yPosition === action.payload.yPosition
        )
          ? state.alivePixels.filter(
              (pixel) =>
                !(
                  pixel.xPosition === action.payload.xPosition &&
                  pixel.yPosition === action.payload.yPosition
                )
            )
          : [
              ...state.alivePixels,
              {
                isAlive: true,
                xPosition: action.payload.xPosition,
                yPosition: action.payload.yPosition,
              },
            ],
      };
    case "resetPixels":
      return {
        ...state,
        alivePixels: [],
        secondsRunning: 0,
        isRunning: false,
      };
    case "resetGame":
      return initialState;
    case "timerTick": {
      let newAlivePixelListIncludingNeighboursOfAlivePixels = [];

      state.alivePixels.forEach((pixel) => {
        for (let i = 0; i < 9; i++) {
          if (i !== 4) {
            const x = pixel.xPosition + (i % 3) - 1;
            const y = pixel.yPosition + Math.floor(i / 3) - 1;

            !newAlivePixelListIncludingNeighboursOfAlivePixels.some(
              (pixel) => pixel.xPosition === x && pixel.yPosition === y
            ) &&
              !state.alivePixels.some(
                (pixel) => pixel.xPosition === x && pixel.yPosition === y
              ) &&
              newAlivePixelListIncludingNeighboursOfAlivePixels.push({
                isAlive: false,
                xPosition: x,
                yPosition: y,
              });
          } else {
            newAlivePixelListIncludingNeighboursOfAlivePixels.push({
              ...pixel,
              isAlive: true,
            });
          }
        }
      });

      const newAlivePixels =
        newAlivePixelListIncludingNeighboursOfAlivePixels.filter(
          (primaryPixel, primaryIndex) => {
            const aliveNeighbours =
              newAlivePixelListIncludingNeighboursOfAlivePixels.reduce(
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

            return pixelNewAliveState;
          }
        );

      return {
        ...state,
        secondsRunning: state.secondsRunning + 1,
        alivePixels: newAlivePixels,
      };
    }
    default:
      throw new Error("Unkown reducer action");
  }
}

function ConwayGameOfLife() {
  const [
    {
      widthQuantity,
      heightQuantity,
      isRunning,
      secondsRunning,
      alivePixels,
      gameSpeed,
    },
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
        isAlive={alivePixels.some(
          (anAlivePixel) =>
            anAlivePixel.xPosition === (index % widthQuantity) + 1 &&
            anAlivePixel.yPosition === Math.floor(index / widthQuantity) + 1
        )}
        dispatch={dispatch}
        key={index}
        pixelDimensions={{
          width: 100 / widthQuantity,
          height: 100 / heightQuantity,
        }}
      />
    );
  });

  return (
    <>
      <NavBar />
      <ProjectContainer>
        <h1>Iconic Conways Game of Life done in React</h1>
        <h4>
          To play the game, click pixels to turn them alive. Then click the
          start the game button
        </h4>
        <h4>
          You can also hold down control key and hover over pixels to turn them
          alive and drag as you wish.
        </h4>
        <br />
        <p>Max width and height is 50</p>
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
        <br />
        <br />
        <p>Game speed multiplier:</p>
        <button
          onClick={() =>
            dispatch({ type: "setGameSpeed", payload: gameSpeed - 1 })
          }
          disabled={isRunning || gameSpeed === 1}
        >
          -
        </button>
        <span>{gameSpeed}</span>
        <button
          onClick={() =>
            dispatch({ type: "setGameSpeed", payload: gameSpeed + 1 })
          }
          disabled={isRunning || gameSpeed === 5}
        >
          +
        </button>
        <Timer
          dispatch={dispatch}
          isRunning={isRunning}
          secondsRunning={secondsRunning}
          gameSpeed={Math.floor(BASE_GAMESPEED / gameSpeed)}
        />
        <GameScreen
          width={widthQuantity}
          height={heightQuantity}
          pixelList={pixelList}
        />
      </ProjectContainer>
    </>
  );
}

export default ConwayGameOfLife;
