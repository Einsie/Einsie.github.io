// An generic component for standard styling of button.
//    Accepts displayable jsx elements as children and
//    takes onClick function used as destructured
//    prop parameters
export default function Button({ children, onClick, extraStyling }) {
  return (
    <button
      className={`button ${
        extraStyling?.length !== undefined ? extraStyling : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
