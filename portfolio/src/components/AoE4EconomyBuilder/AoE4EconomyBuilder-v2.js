/* Project summary:

  Component purpose:
       */

// Import necessary libraries for the component
import { useReducer } from "react";
import SelectOptionInput from "../BasicCustomComponents/SelectOptionInput";
import Button from "../BasicCustomComponents/Button";
import Header from "../Header";
import AddGoal from "./AddGoal";

const exampleValues = {
  buildName: "presetMongol",
  currentStep: 1,
  food: 200,
  wood: 150,
  gold: 100,
  stone: 0,
  units: {
    villager: 6,
    trader: 0,
    fishingShip: 0,
    military: [{ name: "Khan", quantity: 1 }],
  },
  production: [
    { productionType: "LandmarkTownCenter", productionCall: TownCenter },
  ],
  goalUnits: { villager: 0, traders: 0, fishingShips: 0, military: [] },
  goalFood: 0,
  goalWood: 0,
  goalGold: 0,
  goalStone: 0,
  gatheringRatePerSecondFood: 0.6,
  gatheringRatePerSecondWood: 0.6,
  gatheringRatePerSecondGold: 0.6,
  gatheringRatePerSecondStone: 0.6,
  gatheringRateAveragePerMinFood: 37.5,
  gatheringRateAveragePerMinWood: 37.5,
  gatheringRateAveragePerMinGold: 37.5,
  gatheringRateAveragePerMinStone: 37.5,
  gatherRateBonusFood: 1,
  gatherRateBonusWood: 1,
  gatherRateBonusGold: 1,
  gatherRateBonusStone: 1,
  dropOffBonusFood: 1,
  dropOffBonusWood: 1,
  dropOffBonusGold: 1,
  dropOffBonusStone: 1,
  initialGameStartDelay: 3,
  villagerProducedInitialTravelDelay: 5,
  villagerDropOffDelay: 5,

  villagerProductionSpeed: 20,
  timer: 0,
  timerGoal: 0,
  villagerResourceSplitFood: 5,
  villagerResourceSplitWood: 0,
  villagerResourceSplitGold: 1,
  villagerResourceSplitStone: 0,

  tradeDurationOfTrip: 0,
  tradeResourceGainedFood: 0,
  tradeResourceGainedWood: 0,
  tradeResourceGainedGold: 0,
  tradeResourceGainedStone: 0,

  fishingDropOffDelay: 0,
  fishingGatherRateBonus: 1,
  fishingDropOffBonus: 1,

  productionQueuesActiveTownCenter: 1,
  productionQueuesActiveMarket: 0,
  productionQueuesActiveDock: 0,
  recordOfSavedSteps: [],
};

export const initialValues = {
  buildName: "presetMongol",
  curStep: 0,
  savedSteps: [],
  timer: 0,

  curFood: 200,
  curWood: 150,
  curGold: 100,
  curStone: 0,

  goalType: "No goal",
  goalName: null,
  goalFood: null,
  goalWood: null,
  goalGold: null,
  goalStone: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "setGoalType":
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
      return initialValues;
    default:
      throw new Error("Unknown reducer command");
  }
}

// AoE4TargetFireTool is the default function being exported

export default function AoE4EconomyBuilder() {
  //declare the necessary lifted up state variables
  const [state, dispatch] = useReducer(reducer, initialValues);

  // return the jsx components with necessary props they need
  return (
    <div className="inliner target-fire-tool">
      <Header>
        <h1>Age of Empires 4 🏰</h1>
        <h3>💱 Economy Builder for your build order needs 💹</h3>
        <p>
          This project is still under development! Please return to check again
          at a later time
        </p>
      </Header>
      <p>Your build is called: {state.buildName}</p>
      <p>
        {`Timer is at ${
          state.timer / 60 >= 1 ? Math.floor(state.timer / 60) + "min " : ""
        }${state.timer % 60}s.
          You currently have: ${state.curFood} food,
          ${state.curWood} wood,
          ${state.curGold} gold and
          ${state.curStone} stone `}
        <br />
        <br />
        {`${
          state.goalName
            ? "Your goal is to get a " + state.goalName + ". For that you need:"
            : ""
        }`}
        <br />
        {`${state.goalFood ? state.goalFood + " food " : ""}
            ${state.goalWood ? state.goalWood + " wood " : ""}
            ${state.goalGold ? state.goalGold + " gold " : ""}
            ${state.goalStone ? state.goalStone + " stone" : ""}`}
      </p>
      <br />
      {state.savedSteps.length > 0 && (
        <SelectOptionInput
          value={state.curStep}
          onChange={(event) => dispatch({ type: "switchStep", payload: event })}
          options={Array.from(
            { length: state.savedSteps.length },
            (value, index) => index + 1
          )}
          extraContent={"Step "}
        ></SelectOptionInput>
      )}

      <Button onClick={() => dispatch({ type: "saveStep" })}>Save State</Button>
      <Button onClick={() => dispatch({ type: "clearSteps" })}>
        Clear State
      </Button>
      <br />
      <AddGoal dispatch={dispatch} state={state} />
    </div>
  );
}

export function TownCenter() {
  const costOfProduction = {};
  const timeToProduce = 20;
  const isProducing = false;
  const ralliedTo = "";
  return <div>Town Center produces villagers onto rallied resource</div>;
}
