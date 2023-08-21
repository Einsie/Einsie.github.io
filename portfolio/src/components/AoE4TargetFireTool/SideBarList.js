import SideBarListItem from "./SideBarListItem";

export default function SideBarList({ sortedList, onUse, onRemove }) {
  return (<ul>
    {
      /* The following are the list elements, content based on if it
            is a preset or combat log being listed. Both have buttons
            for using the element or removing it from list */
      sortedList?.map((curItem, index) => (
        <SideBarListItem curItem={curItem} onUse={onUse} onRemove={onRemove} key={index} />
      ))}
  </ul>);
}
