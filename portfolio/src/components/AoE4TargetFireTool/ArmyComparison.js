/* ArmyComparison component is the primary logic component for:
    - calculating and declaring the winner of two armies
    - recording and creating a combat log
    - displaying the initial result and summary of the calculations */

// Import necessary libraries for the component
import { useState } from "react";
import Button from "../BasicCustomComponents/Button";

//ArmyComparison is the default function being exported from the component
//  destructure the prop for necessary parameters
export default function ArmyComparison({ armies, onSetCurCombatLog }) {
  // Declare local a state variable to hold the winner through re-renders
  const [winner, setWinner] = useState([{ id: false }]);

  // declare local instance variables for the calculations
  const dps = [];
  const totalHealth = [];
  const totalHealthMilestone = [];
  let finalHealth = [];
  let finalHealthMilestone = [];
  let finalQuantity = [];
  let tempCombatLog = [];

  // initialise the constant arrays
  armies.map((army) => {
    dps.push(army.damage / army.attackSpeed);
    totalHealth.push(army.health * army.quantity);
    totalHealthMilestone.push(army.health * (army.quantity - 1));
    return true;
  });

  // handler functions for the buttons' onClick functions
  function handleClearWinner() {
    setWinner([{ id: false }]);
  }

  // This is the primary behemoth doing the calculations
  function handleCalculateWinner() {
    // Initialising variables in case they weren't cleared first
    setWinner([{ id: false }]);
    onSetCurCombatLog([]);
    // Initialise the temporary combat log with id, trueID,
    //    winner name and quantity, loser name and quantity
    //    for later defining at pre-determined indexes
    tempCombatLog = [
      0,
      crypto.randomUUID(),
      "winner",
      "winnerQnt",
      "loser",
      "loserQnt",
    ];
    finalHealth = [];
    finalHealthMilestone = [];
    finalQuantity = [];

    // initialise the changing array variable values for the armies
    armies.map((army) => {
      finalHealth.push(army.health * army.quantity);
      finalHealthMilestone.push(army.health * (army.quantity - 1));
      finalQuantity.push(army.quantity);
      return true;
    });

    // Define the first strike variable if first strike happens and
    //    the stepcounters to see how many rounds each army has done
    let firstStrike = [false];
    let army0StepCounter = armies[0].range === armies[1].range ? 0 : 1;
    let army1StepCounter = armies[0].range === armies[1].range ? 0 : 1;

    // Infinity loop safeguard variable used during testing
    /* let infinitySafeguard = 0; */

    // Determine if first strike happens between armies.
    //    This happens if the range is not 0 for either army
    //    and if one army has a range greater than the other
    armies[0].range === 0
      ? (firstStrike = [false])
      : armies[1].range === 0
      ? (firstStrike = [false])
      : armies[0].range !== armies[1].range && armies[0].range > armies[1].range
      ? (firstStrike = [true, armies[0].id, armies[1].id])
      : armies[0].range !== armies[1].range && armies[0].range < armies[1].range
      ? (firstStrike = [true, armies[1].id, armies[0].id])
      : (firstStrike = [false]);

    // Begin combat log recording
    tempCombatLog.push(<h2>Beginning combat</h2>);

    // if first strike was determined to be possible, do it.
    firstStrike[0] === true && dealDamage(firstStrike[2], firstStrike[1]);

    // Begin while loop
    while (
      // Infinity safeguard used to protect the loop during testing
      /* infinitySafeguard < 400 && */
      finalQuantity[0] > 0 &&
      finalQuantity[1] > 0
    ) {
      // during testing, after each iteration add one to infinity safeguard, if reaching
      //    near maximum values, set the current temporary combat log
      //    to parents combat log state variable for visual debugging
      /* infinitySafeguard += 1;
      infinitySafeguard > 390 && onSetCurCombatLog(tempCombatLog); */

      tempCombatLog.push(
        <>
          <h4 className="new-combat-round">New round of combat</h4>
          <h4>Checking for army losses:</h4>
        </>
      );

      // Check for army losses through function to avoid repeats,
      //    these functions update the current army quantity and
      //    add to combat log
      checkForUnitLosses(0);
      checkForUnitLosses(1);

      /*  If else statements to determine if winner has been found
            based on remaining army quantity and if it has, was it a draw.
          If no winner was found, deal damage as normal based on
            if range is greater than 0 to allow a strike and
            if the time that has passed for the army, is lower than for the opposing army.
              time that has passed is calculated with Attack speed multiplied
              by how many turns the army has had 
            first check for equal time for simultaneous strike,
              otherwise check for the lower timer */
      if (finalQuantity[0] <= 0 || finalQuantity[1] <= 0) {
        if (finalQuantity[0] <= 0 && finalQuantity[1] <= 0) {
          checkForWinner(0, 1, true);
        } else {
          if (finalQuantity[0] <= 0) {
            checkForWinner(0, 1);
          }

          if (finalQuantity[1] <= 0) {
            checkForWinner(1, 0);
          }
        }
      } else if (
        armies[0].range > 0 &&
        armies[1].range > 0 &&
        army0StepCounter * armies[0].attackSpeed ===
          army1StepCounter * armies[1].attackSpeed
      ) {
        dealDamage(0, 1, army1StepCounter, true, army0StepCounter);
      } else if (
        (armies[0].range > 0 &&
          armies[0].attackSpeed * army0StepCounter <
            armies[1].attackSpeed * army1StepCounter) ||
        armies[1].range === 0
      ) {
        dealDamage(1, 0, army0StepCounter);
      } else if (
        (armies[1].range > 0 &&
          armies[1].attackSpeed * army1StepCounter <
            armies[0].attackSpeed * army0StepCounter) ||
        armies[0].range === 0
      ) {
        dealDamage(0, 1, army1StepCounter);
      }
    }

    /* The extracted function to check unit losses for the army
        If the damage taken exceed the health of an individual unit,
          one soldier is removed from army.
        The damage dealt does not carry over to other units, so as to
          allow overkill of each unit within your army. 
        If army losses happened, add the updated information to combat log */
    function checkForUnitLosses(index) {
      if (finalHealth[index] <= finalHealthMilestone[index]) {
        finalQuantity[index] -= 1;
        finalHealth[index] = finalHealthMilestone[index];
        finalHealthMilestone[index] =
          (finalQuantity[index] - 1) * armies[index].health;
        tempCombatLog.push(
          <>
            <p>Army {armies[index].name} has lost one 💀</p>
            <p>Health left: {finalHealth[index]}🩸</p>
            <p>Next unit dead at: {finalHealthMilestone[index]}🩸</p>
            <p>Units left: {finalQuantity[index]}💂‍♂️</p>
            <p>
              Volley damage left: {armies[index].damage * finalQuantity[index]}
            </p>
            <p>Dps left: {dps[index] * finalQuantity[index]}</p>
          </>
        );
      }
    }

    /* The extracted function to declare winner or draw.
        Defender is the loser and aggressor the winner
          if draw didn't happen.
        If there was a draw, both armies are recorded and
          unique combat log added */
    function checkForWinner(defenderIndex, aggressorIndex, draw) {
      let newWinner;
      if (draw) {
        newWinner = [
          {
            id: aggressorIndex,
            name: armies[aggressorIndex].name,
            health: finalHealth[aggressorIndex],
            quantity: finalQuantity[aggressorIndex],
            steps:
              aggressorIndex === 1
                ? army1StepCounter - 1
                : army0StepCounter - 1,
          },
          {
            id: defenderIndex,
            name: armies[defenderIndex].name,
            health: finalHealth[defenderIndex],
            quantity: finalQuantity[defenderIndex],
            steps:
              defenderIndex === 1 ? army0StepCounter - 1 : army1StepCounter - 1,
          },
        ];
        tempCombatLog.push(
          <p>💀 The battle was a bloody errand and ended in a draw 💀</p>
        );
      } else {
        newWinner = [
          {
            id: aggressorIndex,
            name: armies[aggressorIndex].name,
            health: finalHealth[aggressorIndex],
            quantity: finalQuantity[aggressorIndex],
            steps:
              aggressorIndex === 1
                ? army1StepCounter - 1
                : army0StepCounter - 1,
          },
        ];
        tempCombatLog.push(
          <p>
            👑 Winner was {newWinner[0].name} with 💂‍♂️{newWinner[0].quantity}{" "}
            {newWinner[0].quantity > 1 ? "units" : "unit"} left 👑
          </p>
        );
      }

      // update the originally initialised combat log indexes with desired data
      tempCombatLog[2] = armies[aggressorIndex].name;
      tempCombatLog[3] = armies[aggressorIndex].quantity;
      tempCombatLog[4] = armies[defenderIndex].name;
      tempCombatLog[5] = armies[defenderIndex].quantity;

      // Since updating a state variable causes a re-render,
      //    which re-initialises instance variable data, these are
      //    instead sent to a new function, which will remember the data
      //    inside the parameters while setting the state variables.
      setNewWinner(newWinner, tempCombatLog);
    }

    // The function to set the state variables of winner and
    //    current combat log, the instance variables are
    //    stored inside parameters through the process
    function setNewWinner(newWinner, curLog) {
      setWinner(newWinner);
      onSetCurCombatLog(curLog);
    }

    /* This function handles dealing the damage between armies
          while logging the events in combatlog */
    function dealDamage(
      defender,
      aggressor,
      stepCounter,
      simultaneousStrike,
      stepCounter2
    ) {
      tempCombatLog.push(
        <>
          <h4>🏹 The armies Fire!</h4>
        </>
      );

      // since first strike happens outside combat order, it has unique logged data
      !firstStrike[0]
        ? tempCombatLog.push(
            <>
              <p>
                {armies[aggressor].name} is dealing damage to{" "}
                {armies[defender].name} 🏃‍♂️💨
              </p>
              <p>
                {armies[aggressor].name} has made {stepCounter}{" "}
                {stepCounter > 1 ? "attacks" : "attack"} in regular combat!
              </p>
            </>
          )
        : tempCombatLog.push(
            <>
              <p className="new-combat-round">
                There was a first strike thanks to a greater range!
              </p>
              <p>
                {armies[aggressor].name} dealing damage to{" "}
                {armies[defender].name}
              </p>
            </>
          );

      /* Simultaneous strike is a unique case where both armies had the same
            timer for their next attack, this requires extra logged data
            and cannot happen on top of an attack from only a singular army
          Both armies deal damage to each other. */
      if (simultaneousStrike) {
        finalHealth[defender] -=
        armies[aggressor].damage - armies[defender].armor > 0 ? (armies[aggressor].damage - armies[defender].armor) * finalQuantity[aggressor] : finalQuantity[aggressor];
        finalHealth[aggressor] -=
        armies[defender].damage - armies[aggressor].armor > 0 ? (armies[defender].damage - armies[aggressor].armor) * finalQuantity[defender] : finalQuantity[defender];
        tempCombatLog.push(
          <>
            <p>
              {armies[defender].name} has made {stepCounter2}{" "}
              {stepCounter2 > 1 ? "attacks" : "attack"} in regular combat!
            </p>
            <p>This was a simultaneous strike!</p>
          </>
        );
        // The stepcounters for both armies have to be updated during
        //    simultaneous strike
        army0StepCounter += 1;
        army1StepCounter += 1;
      }
      // if the attack wasn't a simultaenous strike, only defender takes damage
      else
        finalHealth[defender] -=
        armies[aggressor].damage - armies[defender].armor > 0 ? (armies[aggressor].damage - armies[defender].armor) * finalQuantity[aggressor] : finalQuantity[aggressor];

      /* Check if first strike happened, this also stops the stepcounter from
            being updated since it happens outside regular combat order */
      if (firstStrike[0]) {
        // since first strike has been made, it can be turned to false to avoid repeats.
        firstStrike = [false];
      }
      // since first strike didn't happen, we can determine whose stepcounter is being updated
      else if (aggressor === 1 && !simultaneousStrike) {
        army1StepCounter += 1;
      } else if (!simultaneousStrike) army0StepCounter += 1;

      // add the updated information for army after damage has been dealt
      //    with differing logs needed if this was simultaneous strike or not.
      tempCombatLog.push(
        <>
          {!simultaneousStrike ? (
            <p>
              {armies[defender].name} has {finalHealth[defender]} health🩸 left
            </p>
          ) : (
            <>
              <p>
                {armies[defender].name} has {finalHealth[defender]} health🩸
                left
              </p>
              <p>
                {armies[aggressor].name} has {finalHealth[aggressor]} health🩸
                left
              </p>
            </>
          )}
          <p>
            {" "}
            Time passed:{" "}
            {aggressor === 1
              ? (army1StepCounter - 1) * armies[1].attackSpeed
              : (army0StepCounter - 1) * armies[0].attackSpeed}
            s ⏰
          </p>
          <p className="end-combat-round">Round End</p>
        </>
      );
    }
  }

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
              Both armies can't have a range of 0! Edit an army, to change the
              range for at least one of them. Winner can not be calculated
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
