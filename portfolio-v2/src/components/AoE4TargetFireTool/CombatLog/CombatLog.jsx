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
import { useTargetFireTool } from "../../../contexts/TargetFireToolContext";

// CombatLog is the default function being exported from the component
//    destructure the prop for necessary parameters
export default function CombatLog({ children }) {
  const { curCombatLog, dispatch } = useTargetFireTool();
  const [combatHistoryIsOpen, setCombatHistoryIsOpen] = useState(true);

  return (
    <div className="tool-component">
      <Button onClick={() => setCombatHistoryIsOpen(!combatHistoryIsOpen)}>
        {combatHistoryIsOpen ? "Close combat log" : "Open combat log"}
      </Button>
      <Button
        onClick={() =>
          dispatch({ type: "combatLogHistory/add", payload: curCombatLog })
        }
      >
        Add this combat log to history
      </Button>
      <Button
        onClick={() =>
          dispatch({ type: "curCombatLog/set", payload: initialCombatLog })
        }
      >
        Clear current combat log
      </Button>

      {combatHistoryIsOpen && (
        <>
          {children}
          <Button
            onClick={() => setCombatHistoryIsOpen(!combatHistoryIsOpen)}
            extraClasses={"follow"}
          >
            Close combat history
          </Button>
        </>
      )}
    </div>
  );
}
