export default function SideBarListItem({ children, curItem }) {
  return (
    <li>
      {curItem?.isPreset ? (
        <span>
          {curItem.name}: dmg:{curItem.damage} as:{curItem.attackSpeed} hp:
          {curItem.health} ar:{curItem.armor} qnt:{curItem.quantity} rng:
          {curItem.range}{" "}
        </span>
      ) : (
        <span>
          {curItem.name} x{curItem.quantity} VS {curItem.loser} x
          {curItem.loserQuantity}{" "}
        </span>
      )}
      {children}
    </li>
  );
}
