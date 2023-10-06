import Button from "../../BasicCustomComponents/Button";
import CurrentArmiesListItem from "./CurrentArmiesListItem";

export default function CurrentArmiesList({ armies, onEditArmy }) {
  return (
    <ul>
      {armies.map((army) => (
        <CurrentArmiesListItem
          army={army}
          onEditArmy={onEditArmy}
          key={army.name}
        >
          <Button onClick={() => onEditArmy(army)}>Edit</Button>
        </CurrentArmiesListItem>
      ))}
    </ul>
  );
}
