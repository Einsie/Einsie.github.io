/* Project summary:

Component purpose:
*/

// Import necessary libraries for the component
import Header from "../components/AoE4EconomyBuilder/Header";
import AddGoal from "../components/AoE4EconomyBuilder/AddGoal";
import ProjectContainer from "../components/BasicCustomComponents/ProjectContainer";
import NavBar from "../components/BasicCustomComponents/NavBar";
import StepDetails from "../components/AoE4EconomyBuilder/StepDetails";

// AoE4TargetFireTool is the default function being exported

export default function AoE4EconomyBuilder() {
  //declare the necessary lifted up state variables

  // return the jsx components with necessary props they need
  return (
    <>
      <NavBar />
      <ProjectContainer>
        <div className="inliner target-fire-tool">
          <Header>
            <h1>Age of Empires 4 🏰</h1>
            <h3>💱 Economy Builder for your build order needs 💹</h3>
            <p>
              <strong>
                This project is still under development! Please return to check
                again at a later time
              </strong>
            </p>
          </Header>
          <StepDetails />
          <br />
          <AddGoal />
        </div>
      </ProjectContainer>
    </>
  );
}
