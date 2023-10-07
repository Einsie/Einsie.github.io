/* Project summary:

Component purpose:
*/

// Import necessary libraries for the component
import { useReducer } from "react";
import SelectOptionInput from "../components/BasicCustomComponents/SelectOptionInput";
import Button from "../components/BasicCustomComponents/Button";
import Header from "../components/AoE4EconomyBuilder/Header";
import AddGoal from "../components/AoE4EconomyBuilder/AddGoal";
import { initialValues } from "../components/AoE4EconomyBuilder/initialValues";
import ProjectContainer from "../components/BasicCustomComponents/ProjectContainer";
import NavBar from "../components/BasicCustomComponents/NavBar";

function reducer(state, action) {
  switch (action.type) {
    case "setGoalType": {
      const isGoalTypeAlsoName =
        action.payload !== "No goal" &&
        action.payload !== "Other building" &&
        action.payload !== "Unit" &&
        action.payload !== "Technology";

      return {
        ...state,
        goalType: action.payload,
        goalName: isGoalTypeAlsoName ? action.payload : null,
      };
    }
    case "setGoalName":
      return {
        ...state,
        goalName: action.payload.length > 0 ? action.payload : null,
      };
    case "setGoalFood":
      return {
        ...state,
        goalFood: action.payload > 0 ? action.payload : null,
      };
    case "setGoalWood":
      return {
        ...state,
        goalWood: action.payload > 0 ? action.payload : null,
      };
    case "setGoalGold":
      return {
        ...state,
        goalGold: action.payload > 0 ? action.payload : null,
      };
    case "setGoalStone":
      return {
        ...state,
        goalStone: action.payload > 0 ? action.payload : null,
      };
    case "goalAccepted":
      action.payload.preventDefault();

      if (!state.goalName) return state;

      return {
        ...state,
        curFood: state.curFood - state.goalFood,
        goalFood: null,
        curWood: state.curWood - state.goalWood,
        goalWood: null,
        curGold: state.curGold - state.goalGold,
        goalGold: null,
        curStone: state.curStone - state.goalStone,
        goalStone: null,
        goalName: null,
        goalType: "No goal",
        timer: state.timer + 20,
        curStep: state.curStep + 1,
      };
    case "switchStep":
      return {
        ...state.savedSteps[action.payload.target.value - 1],
        savedSteps: state.savedSteps,
      };
    case "saveStep":
      return {
        ...state,
        savedSteps: [...state.savedSteps, { ...state, savedSteps: [] }],
      };
    case "clearSteps":
      return initialValues;
    default:
      throw new Error("Unknown reducer command");
  }
}

// AoE4TargetFireTool is the default function being exported

export default function AoE4EconomyBuilder() {
  //declare the necessary lifted up state variables
  const [state, dispatch] = useReducer(reducer, initialValues);

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
