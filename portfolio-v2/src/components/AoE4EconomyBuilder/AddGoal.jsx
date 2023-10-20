import { useState } from "react";
import SelectOptionInput from "../BasicCustomComponents/SelectOptionInput";
import { useEconomyBuilder } from "../../contexts/EconomyBuilderContext";

function AddGoal() {
  const [isActive, setIsActive] = useState(false);
  const { state, dispatch } = useEconomyBuilder();

  return (
    <div>
      <button onClick={() => setIsActive((isActive) => !isActive)}>
        Add a goal
      </button>
      {isActive ? (
        <form
          onSubmit={(event) => dispatch({ type: "goal/use", payload: event })}
        >
          <SelectOptionInput
            value={state.goalType}
            options={[
              "No goal",
              "Town center",
              "Market",
              "Dock",
              "Other building",
              "Unit",
              "Technology",
            ]}
            placeholder="production type"
            onChange={(event) =>
              dispatch({
                type: "goalType/set",
                payload: event.target.value,
              })
            }
          />
          {(state.goalType === "Other building" ||
            state.goalType === "Unit" ||
            state.goalType === "Technology") && (
            <input
              value={state.goalName ? state.goalName : ""}
              placeholder="Goal name"
              onChange={(event) =>
                dispatch({
                  type: "goalName/set",
                  payload: event.target.value,
                })
              }
            />
          )}

          <br />
          {state.goalName ? (
            <>
              <input
                value={state.goalFood ? state.goalFood : ""}
                placeholder="Food"
                onChange={(event) =>
                  dispatch({
                    type: "goalFood/set",
                    payload: Number(event.target.value),
                  })
                }
              />
              <input
                value={state.goalWood ? state.goalWood : ""}
                placeholder="Wood"
                onChange={(event) =>
                  dispatch({
                    type: "goalWood/set",
                    payload: Number(event.target.value),
                  })
                }
              />
              <input
                value={state.goalGold ? state.goalGold : ""}
                placeholder="Gold"
                onChange={(event) =>
                  dispatch({
                    type: "goalGold/set",
                    payload: Number(event.target.value),
                  })
                }
              />
              <input
                value={state.goalStone ? state.goalStone : ""}
                placeholder="Stone"
                onChange={(event) =>
                  dispatch({
                    type: "goalStone/set",
                    payload: Number(event.target.value),
                  })
                }
              />
              <br />
              <button type="submit">Accept goal</button>
            </>
          ) : null}
        </form>
      ) : null}
    </div>
  );
}

export default AddGoal;
