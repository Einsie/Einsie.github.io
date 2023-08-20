/* ArmiesList component displays the armies currently added to list for
      comparison. It also checks how armies there are in the list and changes
      the content accordingly */

// Import necessary libraries for the component
import Button from "../Button";

// ArmiesList is the default function of the component being exported
//    destructure the propr for necessary parameters
export default function ArmiesList({ armies, onEditArmy, onClearArmy }) {
  return (
    <div className="tool-component">
      {armies.length > 0 ? (
        <>
          <p>💂‍♂️ List of current armies 💂‍♂️</p>
          <ul>
            {armies.map((army) => (
              <li key={army.name}>
                {army.name} damage: {army.damage}, attack speed:{" "}
                {army.attackSpeed}, health: {army.health}, quantity:{" "}
                {army.quantity}, range: {army.range}{" "}
                <Button onClick={() => onEditArmy(army)}>Edit</Button>
              </li>
            ))}
          </ul>
          {armies.length === 1 && (
            <p>Add a second army and you're ready to go!</p>
          )}
          <Button onClick={onClearArmy}>Clear</Button>
        </>
      ) : (
        <p> Begin by adding your two armies to compare!</p>
      )}
    </div>
  );
}
