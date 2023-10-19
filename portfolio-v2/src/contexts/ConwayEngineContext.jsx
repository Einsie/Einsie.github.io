import { createContext, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";

const ConwayEngineContext = createContext();

const initialState = {
  widthQuantity: 10,
  heightQuantity: 10,
  xPositionOffSet: 0,
  yPositionOffSet: 0,
  isRunning: false,
  secondsRunning: 0,
  alivePixels: [],
  gameSpeedMultiplier: 1,
  queryString: "",
};

const BASE_GAMESPEED = 1000;
const BASE__URL = "https://einsie.github.io/#/conwaygameoflife";
// const BASE__URL = "http://localhost:5173/#/conwaygameoflife";

function reducer(state, action) {
  switch (action.type) {
    case "setQueryString": {
      const newQueryString = state.alivePixels.reduce(
        (acc, cur) =>
          acc
            ? acc + "&x=" + cur.xPosition + "&y=" + cur.yPosition
            : BASE__URL +
              acc +
              "?width=" +
              state.widthQuantity +
              "&height=" +
              state.heightQuantity +
              "&x=" +
              cur.xPosition +
              "&y=" +
              cur.yPosition,
        ""
      );
      return { ...state, queryString: newQueryString };
    }
    case "clearQueryString":
      return {
        ...state,
        queryString: "",
      };
    case "initialiseStateFromQueryString": {
      if (!action.payload.xPosition.length > 0) return state;

      const newAlivePixels = Array.from(
        {
          length: action.payload.xPosition.length,
        },
        (value, index) =>
          (value = {
            isAlive: true,
            xPosition: Number(action.payload.xPosition[index]),
            yPosition: Number(action.payload.yPosition[index]),
          })
      );
      return {
        ...state,
        widthQuantity: Number(action.payload.width),
        heightQuantity: Number(action.payload.height),
        alivePixels: newAlivePixels,
      };
    }
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
        Number(action.payload) <= 50 ? Math.floor(Number(action.payload)) : 50;

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
        Number(action.payload) <= 50 ? Math.floor(Number(action.payload)) : 50;

      return {
        ...state,
        heightQuantity: newHeightQuantity,
      };
    }
    case "setXPositionOffSet": {
      if (isNaN(Number(action.payload))) return state;

      const newXPositionOffSet =
        Number(action.payload) > 50
          ? 50
          : Number(action.payload) < -50
          ? -50
          : Math.floor(Number(action.payload));

      return {
        ...state,
        xPositionOffSet: newXPositionOffSet,
      };
    }
    case "setYPositionOffSet": {
      if (isNaN(Number(action.payload))) return state;

      const newYPositionOffSet =
        Number(action.payload) > 50
          ? 50
          : Number(action.payload) < -50
          ? -50
          : Math.floor(Number(action.payload));

      return {
        ...state,
        yPositionOffSet: newYPositionOffSet,
      };
    }
    case "setGameSpeed": {
      if (
        isNaN(Number(action.payload)) ||
        (!isNaN(Number(action.payload)) && Number(action.payload) < 0)
      )
        return state;

      const newGameSpeedMultiplier =
        Number(action.payload) > 0
          ? Number(action.payload) <= 5
            ? Number(action.payload)
            : 5
          : 1;

      return {
        ...state,
        gameSpeedMultiplier: newGameSpeedMultiplier,
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

function ConwayEngineProvider({ children }) {
  const [searchParams] = useSearchParams();
  const [
    {
      widthQuantity,
      heightQuantity,
      isRunning,
      secondsRunning,
      alivePixels,
      gameSpeedMultiplier,
      queryString,
      xPositionOffSet,
      yPositionOffSet,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const gameSpeed = Math.floor(BASE_GAMESPEED / gameSpeedMultiplier);

  useEffect(
    function () {
      const widthParams = searchParams.getAll("width");
      const heightParams = searchParams.getAll("height");
      const xPositionParams =
        searchParams.getAll("xPosition").length === 0
          ? searchParams.getAll("x")
          : searchParams.getAll("xPosition");
      const yPositionParams =
        searchParams.getAll("yPosition").length === 0
          ? searchParams.getAll("y")
          : searchParams.getAll("yPosition");

      dispatch({
        type: "initialiseStateFromQueryString",
        payload: {
          width: widthParams,
          height: heightParams,
          xPosition: xPositionParams,
          yPosition: yPositionParams,
        },
      });
    },
    [searchParams]
  );

  return (
    <ConwayEngineContext.Provider
      value={{
        widthQuantity,
        heightQuantity,
        isRunning,
        secondsRunning,
        alivePixels,
        gameSpeed,
        gameSpeedMultiplier,
        queryString,
        xPositionOffSet,
        yPositionOffSet,

        dispatch,
      }}
    >
      {children}
    </ConwayEngineContext.Provider>
  );
}

export { ConwayEngineProvider, ConwayEngineContext };
