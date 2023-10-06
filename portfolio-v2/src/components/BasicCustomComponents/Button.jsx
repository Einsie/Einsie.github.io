// An generic component for standard styling of button.
//    Accepts displayable jsx elements as children and
//    takes onClick function used as destructured
//    prop parameters
export default function Button({
  children,
  onClick,
  extraClasses,
  extraStyling,
}) {
  return (
    <button
      className={`button ${
        extraClasses?.length !== undefined ? extraClasses : ""
      }`}
      style={{ ...extraStyling }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
