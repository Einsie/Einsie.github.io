import Button from "../BasicCustomComponents/Button";

export default function CurrentArmiesListItem({ army, onEditArmy }) {
  return (<li>
    {army.name} damage: {army.damage}, attack speed:{" "}
    {army.attackSpeed}, health: {army.health}, quantity:{" "}
    {army.quantity}, range: {army.range}{" "}
    <Button onClick={() => onEditArmy(army)}>Edit</Button>
  </li>);
}
