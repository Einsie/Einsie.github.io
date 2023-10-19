import TextInput from "./TextInput";

export default function SearchBar({
  defaultArray,
  searchArrayDataList,
  onSetSortedList,
}) {
  function handleInput(inputValue) {
    const newList = defaultArray
      .slice()
      .filter((curListItem, index) =>
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
      );

    // The match returns a null element if no matches were found
    //    Using this to advantage in filter by checking if not null
    // onSetSortedList(
    //   inputValue.length > 0 && newList.length === defaultArray.length
    //     ? []
    //     : newList
    // );
    onSetSortedList(newList);
  }

  /* The following is the search bar, using controlled input element */
  return (
    <TextInput
      placeholder="Search by name"
      onChange={(event) => handleInput(event.target.value)}
    />
  );
}
