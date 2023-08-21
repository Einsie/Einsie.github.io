/* SideBar is a component to display either combat log history
    or unit presets for project */

// Import necessary libraries to component
import { useState } from "react";
import TextInput from "../BasicCustomComponents/TextInput";
import SelectOptionInput from "../BasicCustomComponents/SelectOptionInput";
import SideBarList from "./SideBarList";

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
      <TextInput
        placeholder="Search by name"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      {/* The following is the drop down select for sorting as controlled element */}
      <SelectOptionInput value={sortBy} onChange={(event) => setSortBy(event.target.value)} options={["oldest", "recent", "name"]} extraContent={"Sort by "}/>
      <SideBarList sortedList={sortedList} onUse={onUse} onRemove={onRemove} />
    </div>
  );
}

