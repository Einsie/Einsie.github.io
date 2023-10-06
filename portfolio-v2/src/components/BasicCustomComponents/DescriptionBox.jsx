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

  const childrenText =
    children.length > 1
      ? children.map((child) =>
          typeof child === "object"
            ? {
                MyType: child.type,
                MyText: child.props.children,
              }
            : child
        )
      : children.props.children;

  const expandedChildrenText =
    typeof childrenText === "object"
      ? children.length > 0
        ? childrenText.map((ChildJSX) => (
            <ChildJSX.MyType key={ChildJSX.MyText}>
              {ChildJSX.MyText}
            </ChildJSX.MyType>
          ))
        : String(childrenText.map((child) => child.MyText + " "))
            .split(" ")
            .slice(0, collapsedNumWords)
            .join(" ") + "... "
      : children;

  const collapsedChildrenText =
    typeof childrenText === "object"
      ? childrenText[0].MyText?.length > collapsedNumWords
        ? childrenText[0].MyText.split(" ")
            .slice(0, collapsedNumWords)
            .join(" ") + "... "
        : childrenText[0].MyText
      : childrenText.length > collapsedNumWords
      ? childrenText.split(" ").slice(0, collapsedNumWords).join(" ") + "... "
      : childrenText;

  return (
    <div className={className}>
      {title}
      <span>{isExpanded ? expandedChildrenText : collapsedChildrenText}</span>
      <button onClick={() => setIsExpanded(!isExpanded)} style={buttonStyle}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
