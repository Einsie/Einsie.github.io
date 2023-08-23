/* Combat log component primarily displays the jsx elements stored inside
      the individual combat log entity given to it.
    Combat log component also has the functionality to add the 
      currently displayed log to combat log history, if it has unique
      trueId, that is not already in the combat log history.
    It can also clear currently displayed log from parent state */

// Import necessary libraries for the component
import { useState } from "react";
import Button from "../../BasicCustomComponents/Button";
import { initialCombatLog } from "../InitialVariables/initialCombatLog";

// CombatLog is the default function being exported from the component
//    destructure the prop for necessary parameters
export default function CombatLog({
  children,
  onAddCombatLogToHistory,
  curCombatLog,
  onSetCurCombatLog,
}) {
  const [combatHistoryIsOpen, setCombatHistoryIsOpen] = useState(false);

  return (
    <div className="tool-component">
      <Button onClick={() => setCombatHistoryIsOpen(!combatHistoryIsOpen)}>
        {combatHistoryIsOpen ? "Close combat log" : "Open combat log"}
      </Button>
      <Button onClick={() => onAddCombatLogToHistory(curCombatLog)}>
        Add this combat log to history
      </Button>
      <Button onClick={() => onSetCurCombatLog(initialCombatLog)}>
        Clear current combat log
      </Button>

      {combatHistoryIsOpen && (
        <>
          {children}
          <Button
            onClick={() => setCombatHistoryIsOpen(!combatHistoryIsOpen)}
            extraStyling={"follow"}
          >
            Close combat history
          </Button>
        </>
      )}
    </div>
  );
}
