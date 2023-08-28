import { useState } from "react";

// generic collapsable description box for text

export default function DescriptionBox({
  children,
  expanded = false,
  className,
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "#1f09cd",
  title,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    color: buttonColor,
    marginLeft: "6px",
  };

  let childrenText = children.map((child) =>
    typeof child === "object"
      ? {
          myType: child.type,
          myText: child.props.children,
        }
      : child
  );

  return (
    <div className={className}>
      {title}
      <span>
        {typeof childrenText === "object"
          ? isExpanded
            ? childrenText.map((ChildJSX) => (
                <ChildJSX.myType key={ChildJSX.myText}>
                  {ChildJSX.myText}
                </ChildJSX.myType>
              ))
            : String(childrenText.map((child) => child.myText + " "))
                .split(" ")
                .slice(0, collapsedNumWords)
                .join(" ") + "... "
          : children.length > 20 && !isExpanded
          ? children.split(" ").slice(0, collapsedNumWords).join(" ") + "... "
          : children}
      </span>
      <button onClick={() => setIsExpanded(!isExpanded)} style={buttonStyle}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
