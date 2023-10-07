import { NavLink } from "react-router-dom";
import ProjectContainer from "./ProjectContainer";

function NavBar() {
  return (
    <ProjectContainer>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
    </ProjectContainer>
  );
}

export default NavBar;
