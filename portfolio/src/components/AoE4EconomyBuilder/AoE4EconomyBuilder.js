/* Project summary:

  Component purpose:
       */

// Import necessary libraries for the component
import { useState } from "react";
import Button from "../BasicCustomComponents/Button";
import SelectOptionInput from "../BasicCustomComponents/SelectOptionInput";

// AoE4TargetFireTool is the default function being exported
export default function AoE4EconomyBuilder() {
  //declare the necessary lifted up state variables
  const [state, setState] = useState(initialValues);
  const [saveState, setSaveState] = useState([initialValues]);

  //add handler functions being passed on to children
  function handleSaveState() {
    saveState.length < state.currentStep
      ? setSaveState((saveState) => {
          return [...saveState, state];
        })
      : setSaveState((saveState) => {
          return [
            ...saveState
              .slice()
              .filter(
                (curSaveState) => curSaveState.currentStep < state.currentStep
              ),
            state,
          ];
        });
  }

  function handleClearState() {
    setState(initialValues);
  }

  function handleSelectOptionInput(event) {
    event.preventDefault();
    console.log(event.target.value);
    setState(saveState[event.target.value - 1]);
  }

  // return the jsx components with necessary props they need
  return (
    <>
      <div className="inliner target-fire-tool">
        <h1>Age of Empires 4 🏰</h1>
        <h3>💱 Economy Builder for your build order needs 💹</h3>
        <p>
          This project is still under development! Please return to check again
          at a later time
        </p>
        <p>Your build is called: {state.buildName}</p>
        <p>
          {`You currently have: ${state.currentState.food} food,
          ${state.currentState.wood} wood,
          ${state.currentState.gold} gold,
          ${state.currentState.stone} stone,
          ${state.currentState.units.villager} villagers,
          ${state.currentState.buildings.townCenter.quantity} ${
            state.currentState.buildings.townCenter.quantity > 1
              ? "towncenters"
              : "towncenter"
          }
          timer is at ${state.timer}s `}
        </p>
        <p>
          {`You have assigned villagers as follows: ${
            state.villagerResourceSplit.food
          } in food,
          ${state.villagerResourceSplit.wood} in wood,
          ${state.villagerResourceSplit.gold} in gold,
          ${state.villagerResourceSplit.stone} in stone, 
          towncenters producing to: ${
            state.currentState.buildings.townCenter.ralliedTo.length > 0
              ? state.currentState.buildings.townCenter.ralliedTo.toLocaleString()
              : "nowhere"
          }`}
        </p>

        {saveState.length > 0 && (
          <SelectOptionInput
            value={state.currentStep}
            onChange={handleSelectOptionInput}
            options={Array.from(
              { length: saveState.length },
              (value, index) => index + 1
            )}
            extraContent={"Step "}
          ></SelectOptionInput>
        )}

        <Button onClick={handleSaveState}>Save State</Button>
        <Button onClick={handleClearState}>Clear State</Button>
      </div>
    </>
  );
}

const initialValues = {
  buildName: "presetMongol",
  currentStep: 1,
  currentState: {
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
    buildings: {
      townCenter: { quantity: 1, quantityProducing: 1, ralliedTo: ["food"] },
      market: { quantity: 1, quantityProducing: 1 },
      dock: { quantity: 0, quantityProducing: 0, ralliedTo: [] },
      other: [{ name: "Ger", quantity: 1, builders: 0, delayFromBuilding: 0 }],
    },
  },
  goal: {
    units: { villager: 0, traders: 0, fishingShips: 0, military: [] },
    food: 0,
    wood: 0,
    gold: 0,
    stone: 0,
  },
  gatheringRatePerSecond: { food: 0.6, wood: 0.6, gold: 0.6, stone: 0.6 },
  gatheringRateAveragePerMin: {
    food: 37.5,
    wood: 37.5,
    gold: 37.5,
    stone: 37.5,
  },
  gatherRateBonus: { food: 1, wood: 1, gold: 1, stone: 1 },
  dropOffBonus: { food: 1, wood: 1, gold: 1, stone: 1 },
  initialGameStartDelay: 3,
  villagerProducedInitialTravelDelay: 5,
  villagerDropOffDelay: 5,

  villagerProductionSpeed: 20,
  timer: 0,
  timerGoal: 0,
  villagerResourceSplit: { food: 5, wood: 0, gold: 1, stone: 0 },
  trade: {
    durationOfTrip: 0,
    resourcesGained: { food: 0, wood: 0, gold: 0, stone: 0 },
  },
  fishing: { dropOffDelay: 0, gatherRateBonus: 0, dropOffBonus: 0 },
  productionQueuesActive: { townCenter: 1, market: 0, dock: 0 },
  recordingOfBuild: [],
};
