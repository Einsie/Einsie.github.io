import Button from "./Button";
import { Link } from "react-router-dom";

export default function PortfolioProject({ children, project, projectName }) {
  return (
    <div style={{ borderStyle: "groove" }}>
      <Button extraStyling={{ marginTop: "5px" }}>
        <Link to={project} style={{ textDecoration: "none", color: "white" }}>
          {projectName}
        </Link>
      </Button>
      {children}
    </div>
  );
}
