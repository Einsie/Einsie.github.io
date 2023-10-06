import SelectOption from "./SelectOption";

export default function SelectOptionInput({
  value,
  onChange,
  options,
  extraContent,
  customReturnValues,
}) {
  function handleOnChange(event) {
    if (customReturnValues?.length > 0) {
      const customReturnIndex = options.indexOf(event.target.value);
      onChange({
        event: event,
        customReturn: customReturnValues[customReturnIndex],
      });
    } else {
      onChange(event);
    }
  }

  return (
    <select value={value} onChange={handleOnChange}>
      {options.map((option, index) => (
        <SelectOption option={option} extraContent={extraContent} key={index} />
      ))}
    </select>
  );
}
