/* AoE4TargetFireTool is the primary project parent component that displays everything.
        it also holds all lifted up states which need to be shared between multiple
        child components, while also handling most of the state edits and passing
        the handler functions to children.

  Project summary:
      This is a React project, meant for calculating the winner of two
      armies, when they have queued target fire commands on one another
      (All soldiers of an army targets singular soldier of the opponent
      army, until it is dead, before moving on to target the next
      soldier). Tool primarily meant for a game called Age of Empires 4,
      but can be used for other RTS with similar mechanics. */

// Import necessary libraries for the component
import { useState } from "react";
import AddArmyForm from "./AddArmyForm";
import ArmyComparison from "./ArmyComparison";
import CurrentArmies from "./CurrentArmies";
import SideBar from "./SideBar";
import CombatLog from "./CombatLog";
import { initialPreset } from "./initialPreset";
import { initialArmy } from "./initialArmy";

// AoE4TargetFireTool is the default function being exported
export default function AoE4TargetFireTool() {
  //declare the necessary lifted up state variables
  const [armies, setArmies] = useState([]);
  const [curEditArmy, setCurEditArmy] = useState(initialArmy);
  const [presetArmies, setPresetArmies] = useState(initialPreset);
  const [combatlogHistory, setCombatLogHistory] = useState([]);
  const [curCombatLog, setCurCombatLog] = useState([]);
  const [combatHistoryIsOpen, setCombatHistoryIsOpen] = useState(false);

  //add handler functions being passed on to children

  // handleRemoveArmy removes an army from armies list and updates
  //    the id of remaining armies using index
  function handleRemoveArmy(oldArmy) {
    setArmies(
      armies
        .filter((army) => army.id !== oldArmy.id)
        .map((army, index) =>
          army.id !== index ? { ...army, id: index } : army
        )
    );
  }

  // handleClearArmies clears the armies state to default
  function handleClearArmies() {
    setArmies([]);
  }

  // handleEditArmy removes the army about to be edited from armies list
  //    and sets it as new army being edited in the form.
  // length of armies is still 2 at this point despite an army been removed
  //    from it
  function handleEditArmy(army) {
    handleRemoveArmy(army);
    armies.length < 3 && setCurEditArmy(army);
  }

  // handleSetPresetArmy sets the chosen presetArmy as the new currently
  //    edited army in the form if armies state doesn't already have 2 in it
  function handleSetPresetArmy(army) {
    armies.length < 2 && setCurEditArmy(army);
  }

  // handleRemovePresetArmy removes the preset army from its list
  //    and updates the id of the remaining presets using their index
  function handleRemovePresetArmy(army) {
    setPresetArmies(
      presetArmies
        .filter((presetArmy) => presetArmy.id !== army.id)
        .map((presetArmy, index) =>
          presetArmy.id !== index ? { ...presetArmy, id: index } : presetArmy
        )
    );
  }

  // handleAddCombatLogToHistory adds a combat log to history
  //    if its trueId does not already exist in it, while
  //    also updating its id at appropriate index
  function handleAddCombatLogToHistory(combatLog) {
    if (
      combatlogHistory.length > 0 &&
      combatlogHistory.reduce(
        (accumulator, curLog) => curLog[1] === combatLog[1] || accumulator,
        false
      )
    )
      return;
    combatLog[0] = combatlogHistory.length;
    setCombatLogHistory((combatlogHistory) => [...combatlogHistory, combatLog]);
  }

  // handleSetCurCombatLog sets the currently displayed combat log to
  //    the desired combatLog
  function handleSetCurCombatLog(combatLog) {
    setCurCombatLog(combatLog);
  }

  // handleRemoveCombatLogFromHistory removes the desired combat log from its history
  //    list while also updating the id of remaining combatlogs
  //    in the appropriate array index of [0]
  function handleRemoveCombatLogFromHistory(combatLog) {
    setCombatLogHistory((combatlogHistory) =>
      combatlogHistory
        .filter((curCombatLog) => curCombatLog[0] !== combatLog[0])
        .map((curCombatLog, curCombatLogIndex) =>
          curCombatLog[0] !== curCombatLogIndex
            ? curCombatLog.map((curLog, curLogIndex) =>
                curLogIndex === 0 ? curCombatLogIndex : curLog
              )
            : curCombatLog
        )
    );
  }

  // return the jsx components with necessary props they need
  return (
    <>
      <SideBar
        position={"left"}
        array={presetArmies}
        onUse={handleSetPresetArmy}
        onRemove={handleRemovePresetArmy}
      >
        <p>Unit Presets</p>
      </SideBar>
      <SideBar
        position={"right"}
        array={combatlogHistory}
        onUse={handleSetCurCombatLog}
        onRemove={handleRemoveCombatLogFromHistory}
      >
        <p>Combat log history</p>
      </SideBar>
      <div className="inliner target-fire-tool">
        <h1>Age of Empires 4 🏰</h1>
        <h3>🏹 Target fire comparison tool for ranged armies 🏹</h3>

        {armies.length < 2 && (
          <AddArmyForm
            armies={armies}
            onAddArmy={setArmies}
            curEditArmy={curEditArmy}
            onEditCurArmy={setCurEditArmy}
            presetArmies={presetArmies}
            onAddPresetArmy={setPresetArmies}
          />
        )}
        <CurrentArmies
          armies={armies}
          onEditArmy={handleEditArmy}
          onClearArmy={handleClearArmies}
        />
        {armies.length > 0 && (
          <ArmyComparison
            armies={armies}
            onClearArmies={handleClearArmies}
            curCombatLog={curCombatLog}
            onSetCurCombatLog={handleSetCurCombatLog}
          />
        )}

        {curCombatLog.length > 0 && (
          <CombatLog
            onAddCombatLogToHistory={handleAddCombatLogToHistory}
            onSetCombatHistoryIsOpen={setCombatHistoryIsOpen}
            combatHistoryIsOpen={combatHistoryIsOpen}
            curCombatLog={curCombatLog}
            onSetCurCombatLog={handleSetCurCombatLog}
          />
        )}
      </div>
    </>
  );
}
