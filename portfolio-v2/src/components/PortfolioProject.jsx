import { useState } from "react";
import Button from "./BasicCustomComponents/Button";
import { Link } from "react-router-dom";

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
        <Link to={project}>{projectName}</Link>
      </Button>
      {
        /* Conditionally display AoE4TargetFireTool depending on state*/
        !projectIsOpen && children
      }
    </div>
  );
}
