import { createContext, useContext, useReducer } from "react";

import { initialArmy } from "../components/AoE4TargetFireTool/InitialVariables/initialArmy";
import { initialPreset } from "../components/AoE4TargetFireTool/InitialVariables/initialPreset";
import { initialCombatLog } from "../components/AoE4TargetFireTool/InitialVariables/initialCombatLog";

const TargetFireToolContext = createContext();

const initialState = {
  armies: [],
  curEditArmy: initialArmy,
  presetArmies: initialPreset,
  combatlogHistory: [],
  curCombatLog: initialCombatLog,
};

function reducer(state, action) {
  switch (action.type) {
    case "curEditArmy/set/name": {
      return {
        ...state,
        curEditArmy: {
          ...state.curEditArmy,
          name: action.payload,
          trueId: crypto.randomUUID(),
        },
      };
    }
    case "curEditArmy/set/damage": {
      return {
        ...state,
        curEditArmy: {
          ...state.curEditArmy,
          damage: isNaN(Number(action.payload)) ? "" : action.payload,
          trueId: crypto.randomUUID(),
        },
      };
    }
    case "curEditArmy/set/attackSpeed": {
      return {
        ...state,
        curEditArmy: {
          ...state.curEditArmy,
          attackSpeed: isNaN(Number(action.payload)) ? "" : action.payload,
          trueId: crypto.randomUUID(),
        },
      };
    }
    case "curEditArmy/set/health": {
      return {
        ...state,
        curEditArmy: {
          ...state.curEditArmy,
          health: isNaN(Number(action.payload)) ? "" : action.payload,
          trueId: crypto.randomUUID(),
        },
      };
    }
    case "curEditArmy/set/armor": {
      return {
        ...state,
        curEditArmy: {
          ...state.curEditArmy,
          armor: isNaN(Number(action.payload)) ? "" : action.payload,
          trueId: crypto.randomUUID(),
        },
      };
    }
    case "curEditArmy/set/quantity": {
      return {
        ...state,
        curEditArmy: {
          ...state.curEditArmy,
          quantity: isNaN(Number(action.payload)) ? "" : action.payload,
          trueId: crypto.randomUUID(),
        },
      };
    }
    case "curEditArmy/set/range": {
      return {
        ...state,
        curEditArmy: {
          ...state.curEditArmy,
          range: isNaN(Number(action.payload)) ? "" : action.payload,
          trueId: crypto.randomUUID(),
        },
      };
    }
    case "curEditArmy/use/preset": {
      // handleSetPresetArmy sets the chosen presetArmy as the new currently
      //    edited army in the form if armies state doesn't already have 2 in it
      return {
        ...state,
        curEditArmy:
          state.armies.length < 2 ? action.payload : state.curEditArmy,
      };
    }
    case "curEditArmy/use/army": {
      // handleEditArmy removes the army about to be edited from armies list
      //    and sets it as new army being edited in the form.
      // length of armies is still 2 at this point despite an army been removed
      //    from it
      return {
        ...state,
        armies: state.armies
          .filter((army) => army.id !== action.payload.id)
          .map((army, index) =>
            army.id !== index ? { ...army, id: index } : army
          ),
        curEditArmy:
          state.armies.length < 3 ? action.payload : state.curEditArmy,
      };
    }
    case "curEditArmy/clear": {
      action.payload.preventDefault();

      return {
        ...state,
        curEditArmy: initialArmy,
      };
    }
    case "armies/add": {
      action.payload.preventDefault();
      if (state.armies.length > 1 || state.curEditArmy.name === "")
        return state;

      const newArmy = {
        ...state.curEditArmy,
        id: state.armies.length,
        damage:
          state.curEditArmy.damage > 0 ? Number(state.curEditArmy.damage) : 1,
        attackSpeed:
          state.curEditArmy.attackSpeed > 0
            ? Number(state.curEditArmy.attackSpeed)
            : 1,
        health:
          state.curEditArmy.health > 0 ? Number(state.curEditArmy.health) : 1,
        armor:
          state.curEditArmy.armor > 0 ? Number(state.curEditArmy.armor) : 0,
        quantity:
          state.curEditArmy.quantity > 0
            ? Number(state.curEditArmy.quantity)
            : 1,
        range:
          state.curEditArmy.range > 0 ? Number(state.curEditArmy.range) : 0,
      };

      return {
        ...state,
        armies: [...state.armies, newArmy],
        curEditArmy: initialArmy,
      };
    }
    case "armies/remove": {
      // removeArmy removes an army from armies list and updates
      //    the id of remaining armies using index
      return {
        ...state,
        armies: state.armies
          .filter((army) => army.id !== action.payload.id)
          .map((army, index) =>
            army.id !== index ? { ...army, id: index } : army
          ),
      };
    }
    case "armies/clear": {
      // handleClearArmies clears the armies state to default
      return {
        ...state,
        armies: [],
      };
    }
    case "preset/add": {
      action.payload.preventDefault();

      if (
        state.curEditArmy.name === "" ||
        state.presetArmies.reduce(
          (acc, preset) => preset.trueId === state.curEditArmy.trueId || acc,
          false
        )
      )
        return state;

      //pass on the newly created army preset to parent state if the trueId does not exist in
      //    the current presets yet.
      return {
        ...state,
        presetArmies: [
          ...state.presetArmies,
          { ...state.curEditArmy, id: state.presetArmies.length },
        ],
      };
    }
    case "preset/remove": {
      // handleRemovePresetArmy removes the preset army from its list
      //    and updates the id of the remaining presets using their index
      return {
        ...state,
        presetArmies: state.presetArmies
          .filter((presetArmy) => presetArmy.id !== action.payload.id)
          .map((presetArmy, index) =>
            presetArmy.id !== index ? { ...presetArmy, id: index } : presetArmy
          ),
      };
    }
    case "curCombatLog/set": {
      // handleSetCurCombatLog sets the currently displayed combat log to
      //    the desired combatLog

      return {
        ...state,
        curCombatLog: action.payload,
      };
    }
    case "combatLogHistory/add": {
      // handleAddCombatLogToHistory adds a combat log to history
      //    if its trueId does not already exist in it, while
      //    also updating its id at appropriate index
      if (
        state.combatlogHistory.length > 0 &&
        state.combatlogHistory.reduce(
          (accumulator, curLog) =>
            curLog.trueId === action.payload.trueId || accumulator,
          false
        )
      )
        return state;
      action.payload.id = state.combatlogHistory.length;
      return {
        ...state,
        combatlogHistory: [...state.combatlogHistory, action.payload],
      };
    }
    case "combatLogHistory/remove": {
      // handleRemoveCombatLogFromHistory removes the desired combat log from its history
      //    list while also updating the id of remaining combatlogs
      //    in the appropriate array index of [0]
      return {
        ...state,
        combatlogHistory: state.combatlogHistory
          .filter((curCombatLog) => curCombatLog.id !== action.payload.id)
          .map((curCombatLog, curCombatLogIndex) =>
            curCombatLog.id !== curCombatLogIndex
              ? { ...curCombatLog, id: curCombatLogIndex }
              : curCombatLog
          ),
      };
    }
    default:
      throw new Error("Unknown reducer action");
  }
}

function TargetFireToolProvider({ children }) {
  const [
    { armies, curEditArmy, presetArmies, combatlogHistory, curCombatLog },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <TargetFireToolContext.Provider
      value={{
        armies,
        curEditArmy,
        presetArmies,
        combatlogHistory,
        curCombatLog,

        dispatch,
      }}
    >
      {children}
    </TargetFireToolContext.Provider>
  );
}

function useTargetFireTool() {
  const context = useContext(TargetFireToolContext);
  if (TargetFireToolContext === undefined)
    throw new Error(
      "TargetFireToolContext used outside TargetFireToolProvider"
    );

  return context;
}

export { TargetFireToolProvider, useTargetFireTool };
