import CurrentArmiesListItem from "./CurrentArmiesListItem";

export default function CurrentArmiesList({ armies, onEditArmy }) {
  return (<ul>
    {armies.map((army) => (
      <CurrentArmiesListItem army={army} onEditArmy={onEditArmy} key={army.name} />
    ))}
  </ul>);
}
