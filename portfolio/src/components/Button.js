// An generic component for standard styling of button.
//    Accepts displayable jsx elements as children and
//    takes onClick function used as destructured
//    prop parameters
export default function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
