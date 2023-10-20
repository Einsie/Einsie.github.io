/* ArmyComparison component is the primary logic component for:
    - calculating and declaring the winner of two armies
    - recording and creating a combat log
    - displaying the initial result and summary of the calculations */

// Import necessary libraries for the component
import Button from "../BasicCustomComponents/Button";
import { useTargetFireTool } from "../../contexts/TargetFireToolContext";
import { useArmyComparison } from "../../hooks/useArmyComparison";

//ArmyComparison is the default function being exported from the component
//  destructure the prop for necessary parameters
export default function ArmyComparison() {
  const { armies } = useTargetFireTool();
  const [
    { winner, dps, totalHealth, totalHealthMilestone },
    handleCalculateWinner,
    handleClearWinner,
  ] = useArmyComparison();

  return (
    <div className="tool-component">
      <div>
        {/* The following shows the preliminary data of the armies added to armylist
                If two armies have been added with at least one of them
                having a range greater than 0, calculate winner button is 
                made available */}
        {armies.length > 0 && (
          <p>
            {armies[0].name}: Each volley for army does{" "}
            {armies[0].damage * armies[0].quantity} damage. Has attack speed of{" "}
            {armies[0].attackSpeed}. DPS is {dps[0]} with total health of{" "}
            {totalHealth[0]}. Next unit dead at {totalHealthMilestone[0]}
          </p>
        )}
        {armies.length > 1 && (
          <p>
            {armies[1].name}: Each volley for army does{" "}
            {armies[1].damage * armies[1].quantity} damage. Has attack speed of{" "}
            {armies[1].attackSpeed}. DPS is {dps[1]} with total health of{" "}
            {totalHealth[1]} next unit dead at {totalHealthMilestone[1]}
          </p>
        )}
        {armies.length === 2 && armies[0].range + armies[1].range > 0 ? (
          <Button onClick={handleCalculateWinner}>Calculate a winner</Button>
        ) : (
          armies.length === 2 &&
          armies[0].range + armies[1].range === 0 && (
            <p>
              Both armies can&apos;t have a range of 0! Edit an army, to change
              the range for at least one of them. Winner can not be calculated
              before that.
            </p>
          )
        )}

        {
          /* Once winner has been determined, the data can be safely shown, with
                differing content depending on if the battle was a draw or winner emerged */
          winner[0].id !== false && (
            <>
              {winner.length === 1 ? (
                <p>
                  Winner is {winner[0].name} with {winner[0].quantity} left
                  alive. Battle took {winner[0].steps} attacks and{" "}
                  {winner[0].steps * armies[winner[0].id]?.attackSpeed} seconds
                  for {winner[0].name} to win. Remaining total health is{" "}
                  {winner[0].health} with a total dps of{" "}
                  {dps[winner[0].id] * winner[0].quantity}. Each volley still
                  deals {winner[0].quantity * armies[winner[0].id]?.damage}{" "}
                  damage.
                </p>
              ) : (
                <p>
                  Their battle was a draw!
                  {winner[0].name} did {winner[0].steps} attacks in{" "}
                  {winner[0].steps * armies[winner[0].id]?.attackSpeed} seconds.
                  In same amount of time {winner[1].name} did {winner[1].steps}{" "}
                  attacks
                </p>
              )}
              <Button onClick={handleClearWinner}>Clear the winner</Button>
            </>
          )
        }
      </div>
    </div>
  );
}
