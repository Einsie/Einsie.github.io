export default function CurrentArmiesListItem({ children, army }) {
  return (
    <li>
      {army.name} damage: {army.damage}, attack speed: {army.attackSpeed},
      health: {army.health}, quantity: {army.quantity}, range: {army.range}{" "}
      {children}
    </li>
  );
}
