import { useState } from "react";
import Button from "./BasicCustomComponents/Button";

export default function PortfolioProject({
  children,
  project,
  projectName,
  onSetCurSelectedPortfolioProject,
}) {
  const [projectIsOpen, setProjectIsOpen] = useState(false);

  function handleOnClick() {
    setProjectIsOpen((projectIsOpen) => !projectIsOpen);
    onSetCurSelectedPortfolioProject(!projectIsOpen ? projectName : "");
  }

  return (
    <div style={{ borderStyle: "groove" }}>
      <Button onClick={handleOnClick} extraStyling={{ marginTop: "5px" }}>
        {projectIsOpen
          ? "Close project " + projectName
          : "Open project " + projectName}
      </Button>
      {
        /* Conditionally display AoE4TargetFireTool depending on state*/
        projectIsOpen ? project : children
      }
    </div>
  );
}
