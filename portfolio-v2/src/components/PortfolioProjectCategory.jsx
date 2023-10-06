import { useState } from "react";
import Button from "./BasicCustomComponents/Button";

export default function PortfolioProjectCategory({
  children,
  categoryName,
  onSetCurSelectedPortfolioCategory,
}) {
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);

  function handleOnClick() {
    setCategoryIsOpen((categoryIsOpen) => !categoryIsOpen);
    onSetCurSelectedPortfolioCategory(!categoryIsOpen ? categoryName : "");
  }
  return (
    <div style={{ borderStyle: "groove" }}>
      <Button
        onClick={handleOnClick}
        extraStyling={{ marginTop: "5px", marginBottom: "5px" }}
      >
        {categoryIsOpen
          ? "Close category " + categoryName
          : "Open category " + categoryName}
      </Button>
      {
        /* Conditionally display AoE4TargetFireTool depending on state*/
        categoryIsOpen && children
      }
    </div>
  );
}
