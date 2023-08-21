import SelectOption from "./SelectOption";

export default function SelectOptionInput({ value, onChange, options, extraContent }) {
  
  return (
    <select
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => <SelectOption option={option} extraContent={extraContent} key={index} />)}
    </select>);
}
