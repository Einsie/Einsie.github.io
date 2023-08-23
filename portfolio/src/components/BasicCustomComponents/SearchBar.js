import { useState } from "react";
import TextInput from "./TextInput";

export default function SearchBar({
  defaultArray,
  searchArrayDataList,
  onSetSortedList,
}) {
  const [searchInput, setSearchInput] = useState("");

  function handleInput(inputValue) {
    setSearchInput(inputValue);

    // The match returns a null element if no matches were found
    //    Using this to advantage in filter by checking if not null
    inputValue.length > 0
      ? onSetSortedList(
          defaultArray
            .slice()
            .map((curListItem, index) =>
              searchArrayDataList[index].length > 1
                ? searchArrayDataList[index].reduce(
                    (accumulator, curItemSearchOption) =>
                      String(curItemSearchOption)
                        .toLocaleLowerCase()
                        .match(inputValue.toLocaleLowerCase()) !== null ||
                      accumulator,
                    false
                  )
                : String(searchArrayDataList[index][0])
                    .toLocaleLowerCase()
                    .match(inputValue.toLocaleLowerCase()) !== null
            )
        )
      : onSetSortedList([]);
  }

  /* The following is the search bar, using controlled input element */
  return (
    <TextInput
      placeholder="Search by name"
      value={searchInput}
      onChange={(event) => handleInput(event.target.value)}
    />
  );
}
