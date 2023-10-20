import { createContext, useContext, useReducer } from "react";
import { initialState } from "../components/AoE4EconomyBuilder/initialState";

const EconomyBuilderContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "setGoalType": {
      const isGoalTypeAlsoName =
        action.payload !== "No goal" &&
        action.payload !== "Other building" &&
        action.payload !== "Unit" &&
        action.payload !== "Technology";

      return {
        ...state,
        goalType: action.payload,
        goalName: isGoalTypeAlsoName ? action.payload : null,
      };
    }
    case "setGoalName":
      return {
        ...state,
        goalName: action.payload.length > 0 ? action.payload : null,
      };
    case "setGoalFood":
      return {
        ...state,
        goalFood: action.payload > 0 ? action.payload : null,
      };
    case "setGoalWood":
      return {
        ...state,
        goalWood: action.payload > 0 ? action.payload : null,
      };
    case "setGoalGold":
      return {
        ...state,
        goalGold: action.payload > 0 ? action.payload : null,
      };
    case "setGoalStone":
      return {
        ...state,
        goalStone: action.payload > 0 ? action.payload : null,
      };
    case "goalAccepted":
      action.payload.preventDefault();

      if (!state.goalName) return state;

      return {
        ...state,
        curFood: state.curFood - state.goalFood,
        goalFood: null,
        curWood: state.curWood - state.goalWood,
        goalWood: null,
        curGold: state.curGold - state.goalGold,
        goalGold: null,
        curStone: state.curStone - state.goalStone,
        goalStone: null,
        goalName: null,
        goalType: "No goal",
        timer: state.timer + 20,
        curStep: state.curStep + 1,
      };
    case "switchStep":
      return {
        ...state.savedSteps[action.payload.target.value - 1],
        savedSteps: state.savedSteps,
      };
    case "saveStep":
      return {
        ...state,
        savedSteps: [...state.savedSteps, { ...state, savedSteps: [] }],
      };
    case "clearSteps":
      return initialState;
    default:
      throw new Error("Unknown reducer command");
  }
}

function EconomyBuilderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EconomyBuilderContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EconomyBuilderContext.Provider>
  );
}

function useEconomyBuilder() {
  const context = useContext(EconomyBuilderContext);
  if (context === undefined)
    throw new Error(
      "EconomyBuilderContext used outside EconomyBuilderProvider"
    );
  return context;
}

export { EconomyBuilderProvider, useEconomyBuilder };
