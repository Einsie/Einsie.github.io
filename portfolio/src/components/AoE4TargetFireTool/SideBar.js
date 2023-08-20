/* SideBar is a component to display either combat log history
    or unit presets for project */

// Import necessary libraries to component
import { useState } from "react";
import Button from "../Button";

// Declare SideBar as the default function returned from file
//    destructure the prop for necessary parameters
export default function SideBar({
  children,
  position,
  array,
  onUse,
  onRemove,
}) {
  // Declare local  instance state variables for the component
  //    to control the input and select elements
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("oldest");

  // the list which will be derived from parent state array,
  //    received as parameter
  let sortedList;

  /* The following if else is for sorting the parent array
        list into sortedList, based on search bar and sort selection
      First confirm that the parent list is not empty and confirm if
        it is a preset or combat log */
  if (array.length > 0 && array[0]?.isPreset) {
    // The parent array has to be sliced first to create
    //    a copy of it, as to not edit the original array with sort()
    sortBy === "oldest"
      ? (sortedList = array)
      : sortBy === "recent"
      ? (sortedList = array.slice().sort((a, b) => Number(b.id) - Number(a.id)))
      : (sortedList = array
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name)));

    // The match returns a null element if no matches were found
    //    Using this to advantage in filter by checking if not null
    searchInput.length > 0 &&
      (sortedList = sortedList
        .slice()
        .filter(
          (curItem) =>
            String(curItem.name)
              .toLocaleLowerCase()
              .match(searchInput.toLocaleLowerCase()) !== null
        ));
  }
  // Repeat similar treatment for combat logs if the parent state is not empty
  else if (array.length > 0) {
    sortBy === "oldest"
      ? (sortedList = array)
      : sortBy === "recent"
      ? (sortedList = array.slice().sort((a, b) => Number(b[0]) - Number(a[0])))
      : (sortedList = array.slice().sort((a, b) => a[2].localeCompare(b[2])));

    searchInput.length > 0 &&
      (sortedList = sortedList
        .slice()
        .filter(
          (curItem) =>
            String(curItem[2])
              .toLocaleLowerCase()
              .match(searchInput.toLocaleLowerCase()) !== null ||
            String(curItem[4])
              .toLocaleLowerCase()
              .match(searchInput.toLocaleLowerCase()) !== null
        ));
  }

  // Return jsx to parent component, location and some content taken
  //    as parameters
  return (
    <div className={`sidebar ${position}`}>
      {children}
      {/* The following is the search bar, using controlled input element */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      ></input>
      {
        /* The following is the drop down select for sorting as controlled element */
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="oldest">Sort by Oldest</option>
          <option value="recent">Sort by most recent</option>
          <option value="name">Sort by name</option>
        </select>
      }
      <ul>
        {
          /* The following are the list elements, content based on if it
                is a preset or combat log being listed. Both have buttons
                for using the element or removing it from list */
          sortedList?.map((curItem, index) => (
            <li key={index}>
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
            </li>
          ))
        }
      </ul>
    </div>
  );
}
