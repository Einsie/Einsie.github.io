/* Project summary:

Component purpose:
*/

// Import necessary libraries for the component
import SelectOptionInput from "../components/BasicCustomComponents/SelectOptionInput";
import Button from "../components/BasicCustomComponents/Button";
import Header from "../components/AoE4EconomyBuilder/Header";
import AddGoal from "../components/AoE4EconomyBuilder/AddGoal";
import ProjectContainer from "../components/BasicCustomComponents/ProjectContainer";
import NavBar from "../components/BasicCustomComponents/NavBar";
import { useEconomyBuilder } from "../contexts/EconomyBuilderContext";

// AoE4TargetFireTool is the default function being exported

export default function AoE4EconomyBuilder() {
  //declare the necessary lifted up state variables
  const { state, dispatch } = useEconomyBuilder();

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
          <p>Your build is called: {state.buildName}</p>
          <p>
            {`Timer is at ${
              state.timer / 60 >= 1 ? Math.floor(state.timer / 60) + "min " : ""
            }${state.timer % 60}s.
          You currently have: ${state.curFood} food,
          ${state.curWood} wood,
          ${state.curGold} gold and
          ${state.curStone} stone `}
            <br />
            <br />
            {`${
              state.goalName
                ? "Your goal is to get a " +
                  state.goalName +
                  ". For that you need:"
                : ""
            }`}
            <br />
            {`${state.goalFood ? state.goalFood + " food " : ""}
            ${state.goalWood ? state.goalWood + " wood " : ""}
            ${state.goalGold ? state.goalGold + " gold " : ""}
            ${state.goalStone ? state.goalStone + " stone" : ""}`}
          </p>
          <br />
          {state.savedSteps.length > 0 && (
            <SelectOptionInput
              value={state.curStep}
              onChange={(event) =>
                dispatch({ type: "switchStep", payload: event })
              }
              options={Array.from(
                { length: state.savedSteps.length },
                (value, index) => index + 1
              )}
              extraContent={"Step "}
            ></SelectOptionInput>
          )}

          <Button onClick={() => dispatch({ type: "saveStep" })}>
            Save State
          </Button>
          <Button onClick={() => dispatch({ type: "clearSteps" })}>
            Clear State
          </Button>
          <br />
          <AddGoal dispatch={dispatch} state={state} />
        </div>
      </ProjectContainer>
    </>
  );
}

export function TownCenter() {
  // const costOfProduction = {};
  // const timeToProduce = 20;
  // const isProducing = false;
  // const ralliedTo = "";
  return <div>Town Center produces villagers onto rallied resource</div>;
}
