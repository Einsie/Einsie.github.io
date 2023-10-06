import SideBarListItem from "./SideBarListItem";
import Button from "../../BasicCustomComponents/Button";

export default function SideBarList({ sortedList, onUse, onRemove }) {
  return (
    <ul>
      {
        /* The following are the list elements, content based on if it
            is a preset or combat log being listed. Both have buttons
            for using the element or removing it from list */
        sortedList?.map((curItem, index) => (
          <SideBarListItem curItem={curItem} key={index}>
            <div>
              <Button onClick={() => onUse(curItem)}>Use</Button>
              <Button onClick={() => onRemove(curItem)}>Remove</Button>
            </div>
          </SideBarListItem>
        ))
      }
    </ul>
  );
}
