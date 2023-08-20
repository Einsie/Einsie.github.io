/* Combat log component primarily displays the jsx elements stored inside
      the individual combat log entity given to it.
    Combat log component also has the functionality to add the 
      currently displayed log to combat log history, if it has unique
      trueId, that is not already in the combat log history.
    It can also clear currently displayed log from parent state */

// Import necessary libraries for the component
import Button from "../Button";

// CombatLog is the default function being exported from the component
//    destructure the prop for necessary parameters
export default function CombatLog({
  onAddCombatLogToHistory,
  onSetCombatHistoryIsOpen,
  combatHistoryIsOpen,
  curCombatLog,
  onSetCurCombatLog,
}) {
  return (
    <div className="tool-component">
      <Button onClick={() => onSetCombatHistoryIsOpen(!combatHistoryIsOpen)}>
        {combatHistoryIsOpen ? "Close combat log" : "Open combat log"}
      </Button>
      <Button onClick={() => onAddCombatLogToHistory(curCombatLog)}>
        Add this combat log to history
      </Button>
      <Button onClick={() => onSetCurCombatLog([])}>
        Clear current combat log
      </Button>

      {combatHistoryIsOpen && (
        <>
          <ul>
            {curCombatLog.map((curLog, index) => (
              <li key={index}>{curLog}</li>
            ))}
          </ul>
          <Button
            onClick={() => onSetCombatHistoryIsOpen(!combatHistoryIsOpen)}
          >
            Close combat history
          </Button>
        </>
      )}
    </div>
  );
}
