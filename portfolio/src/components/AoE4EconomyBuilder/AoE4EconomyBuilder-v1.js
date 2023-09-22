/* Project summary:

  Component purpose:
       */

// Import necessary libraries for the component
import React, { useState, useReducer } from "react";
import Button from "../BasicCustomComponents/Button";
import SelectOptionInput from "../BasicCustomComponents/SelectOptionInput";
import { AddProduction } from "./AddProduction";

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
    production: [
      { productionType: "LandmarkTownCenter", productionCall: TownCenter },
    ],
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

// AoE4TargetFireTool is the default function being exported
export default function AoE4EconomyBuilder() {
  //declare the necessary lifted up state variables
  const [state, setState] = useState(initialValues);
  const [saveState, setSaveState] = useState([]);

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
    setState((state) => {
      return { ...state, currentStep: state.currentStep + 1 };
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

  function handleAddProduction(newProduction) {
    setState((curState) => {
      return {
        ...curState,
        currentState: {
          ...curState.currentState,
          production: [...curState.currentState.production, newProduction],
        },
      };
    });
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
          timer is at ${state.timer}s `}
        </p>
        <p>
          {`You have assigned villagers as follows: ${state.villagerResourceSplit.food} in food,
          ${state.villagerResourceSplit.wood} in wood,
          ${state.villagerResourceSplit.gold} in gold,
          ${state.villagerResourceSplit.stone} in stone, 
          `}
        </p>

        {saveState.length > 0 && (
          <SelectOptionInput
            value={state.currentStep - 1}
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
      <div>
        <AddProduction onAddProduction={handleAddProduction}></AddProduction>
        {state.currentState.production.length > 0 ? (
          state.currentState.production.map((curBuilding, index) => {
            return <curBuilding.productionCall key={index} />;
          })
        ) : (
          <p>No production added</p>
        )}
        <ResourceLocation></ResourceLocation>
      </div>
    </>
  );
}

function AddGoals() {}

export function TownCenter() {
  const costOfProduction = {};
  const timeToProduce = 20;
  const isProducing = false;
  const ralliedTo = "";
  return <div>Town Center produces villagers onto rallied resource</div>;
}

export function Market() {
  const costOfProduction = {};
  const timeToProduce = 20;
  const isProducing = false;
  const ralliedTo = "";
  return <div>Market produces traders to TradeRoute</div>;
}

export function Dock() {
  const costOfProduction = {};
  const timeToProduce = 20;
  const isProducing = false;
  const ralliedTo = "";
  return (
    <div>
      Dock produces traders or fishing ship onto trade route or fish node
    </div>
  );
}

export function OtherProduction() {
  const costOfProduction = {};
  const timeToProduce = 20;
  const isProducing = false;
  return <div>All other types of buildings that can provide something</div>;
}

function Gatherer({ dDelay = 1, iDelay = 4 }) {
  const deliveryDelay = dDelay;
  const initialDelay = iDelay;
  const currentlyHeldResources = 0;
  const currentlyHeldResourceType = "";
  const isIdle = false;

  return <div>Villager / Fishing Ship / Trader</div>;
}

function ResourceLocation() {
  const gatherers = [];
  const totalResourceIEntitiesAtLocation = 1;
  return (
    <div>
      Some individual resource entities mapped like tree, gold, deer or farm
      etc.
    </div>
  );
}

function Forest({ trees = 25 }) {
  const gatherers = [];
  const treeQuantity = trees;
  return (
    <div>
      <Wood></Wood>
    </div>
  );
}

function Wood({ dropOff }) {
  const gatherers = [];
  const maxGatherer = 5;
  const resourceQuantity = 150;
  const defaultGatherRate = 0.6;
  const dropOffBonus = dropOff;

  return <div>Wood</div>;
}

function Gold({ initialQuantity, dropOff }) {
  const gatherers = [];
  const maxGatherer = 18;
  const resourceQuantity = initialQuantity;
  const defaultGatherRate = 0.6;
  const dropOffBonus = dropOff;

  return <div>Gold</div>;
}

function Stone({ initialQuantity, dropOff }) {
  const gatherers = [];
  const maxGatherer = 18;
  const resourceQuantity = initialQuantity;
  const defaultGatherRate = 0.6;
  const dropOffBonus = dropOff;

  return <div>Stone</div>;
}

function FlockOfSheep({ quantity }) {
  const gatherers = [];
  const sheepQuantity = quantity;
  return (
    <div>
      <Sheep></Sheep>
    </div>
  );
}

function Sheep({ dropOff }) {
  const gatherers = [];
  const maxGatherer = 8;
  const resourceQuantity = 250;
  const defaultGatherRate = 0.6;
  const dropOffBonus = dropOff;

  return <div>Sheep</div>;
}

function FarmLands({ quantity }) {
  const gatherers = [];
  const farmQuantity = quantity;
  return (
    <div>
      <Farm></Farm>
    </div>
  );
}

function Farm({ dropOff }) {
  const gatherer = [];
  const maxGatherer = 1;
  const resourceQuantity = 9001;
  const defaultGatherRate = 0.6;
  const dropOffBonus = dropOff;

  return <div>Farm</div>;
}

function HerdOfDeer({ quantity }) {
  const gatherers = [];
  const deerQuantity = quantity;
  return (
    <div>
      <Deer></Deer>
    </div>
  );
}

function Deer({ dropOff }) {
  const gatherers = [];
  const maxGatherer = 8;
  const resourceQuantity = 350;
  const defaultGatherRate = 0.7;
  const dropOffBonus = dropOff;

  return <div>Deer</div>;
}

function Boar({ dropOff }) {
  const gatherers = [];
  const maxGatherer = 8;
  const resourceQuantity = 2000;
  const defaultGatherRate = 0.9;
  const dropOffBonus = dropOff;

  return <div>Boar</div>;
}

function ShoreLine({ quantity }) {
  const gatherers = [];
  const treeQuantity = quantity;
  return (
    <div>
      <ShorelineFish></ShorelineFish>
    </div>
  );
}

function ShorelineFish({ dropOff }) {
  const gatherers = [];
  const maxGatherer = 8;
  const resourceQuantity = 500;
  const defaultGatherRate = 1;
  const dropOffBonus = dropOff;

  return <div>SorelineFish</div>;
}

function DeepSea({ quantity }) {
  const gatherers = [];
  const treeQuantity = quantity;
  return (
    <div>
      <DeepSeaFish></DeepSeaFish>
    </div>
  );
}

function DeepSeaFish({ dropOff }) {
  const gatherers = [];
  const maxGatherer = 8;
  const resourceQuantity = 9001;
  const defaultGatherRate = 1.7;
  const dropOffBonus = dropOff;

  return <div>DeepSeaFish</div>;
}

function TradeRoute({ food, wood, gold, stone, dropOff }) {
  const gatherers = [];
  const maxGatherer = 9001;
  const resourceQuantity = 9001;
  const defaultGatherRate = 0.5;
  const dropOffBonus = dropOff;
  const marketFood = food;
  const marketFoodBonus = 1;
  const marketWood = wood;
  const marketWoodBonus = 1;
  const marketGold = gold;
  const marketGoldBonus = 1;
  const marketStone = stone;
  const marketStoneBonus = 1;

  return <div>Trader</div>;
}
