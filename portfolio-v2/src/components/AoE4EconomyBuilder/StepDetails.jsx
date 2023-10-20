import { useEconomyBuilder } from "../../contexts/EconomyBuilderContext";
import Button from "../BasicCustomComponents/Button";
import SelectOptionInput from "../BasicCustomComponents/SelectOptionInput";

function StepDetails() {
  const { state, dispatch } = useEconomyBuilder();

  return (
    <div>
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
            ? "Your goal is to get a " + state.goalName + ". For that you need:"
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
            dispatch({ type: "step/switch", payload: event })
          }
          options={Array.from(
            { length: state.savedSteps.length },
            (value, index) => index + 1
          )}
          extraContent={"Step "}
        ></SelectOptionInput>
      )}
      <br />
      <Button onClick={() => dispatch({ type: "step/save" })}>
        Save State
      </Button>
      <Button onClick={() => dispatch({ type: "steps/clear" })}>
        Clear State
      </Button>
    </div>
  );
}

export default StepDetails;
