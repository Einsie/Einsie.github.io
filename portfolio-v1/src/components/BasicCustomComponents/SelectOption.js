export default function SelectOption({ option, extraContent }) {
  return (<option value={option}>{extraContent !== undefined ? extraContent : ""}{option}</option>);
}
