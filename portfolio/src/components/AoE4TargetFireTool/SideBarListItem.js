import Button from "../BasicCustomComponents/Button";

export default function SideBarListItem({ curItem, onUse, onRemove }) {
  return (<li>
    {curItem?.isPreset ? (
      <span>
        {curItem.name}: dmg:{curItem.damage} as:
        {curItem.attackSpeed} hp:{curItem.health} qnt:{" "}
        {curItem.quantity} rng: {curItem.range}{" "}
      </span>
    ) : (
      <span>
        {curItem[2]} x{curItem[3]} VS {curItem[4]} x{curItem[5]}{" "}
      </span>
    )}
    <Button onClick={() => onUse(curItem)}>Use</Button>
    <Button onClick={() => onRemove(curItem)}>Remove</Button>
  </li>);
}
