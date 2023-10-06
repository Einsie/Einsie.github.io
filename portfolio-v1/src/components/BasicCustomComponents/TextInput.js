// a very generic text input component which could be styled as desired
export default function TextInput({ placeholder, value, onChange }) {
  return (<input className="text-input"
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  ></input>);
}
