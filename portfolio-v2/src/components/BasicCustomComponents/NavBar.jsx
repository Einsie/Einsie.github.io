import { NavLink } from "react-router-dom";
import ProjectContainer from "./ProjectContainer";
import Button from "./Button";

function NavBar() {
  return (
    <ProjectContainer>
      <ul>
        <li>
          <Button>
            <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </NavLink>
          </Button>
        </li>
      </ul>
    </ProjectContainer>
  );
}

export default NavBar;
