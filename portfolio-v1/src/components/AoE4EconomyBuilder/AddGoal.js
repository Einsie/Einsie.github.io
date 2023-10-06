import { useState } from "react";
import SelectOptionInput from "../BasicCustomComponents/SelectOptionInput";

function AddGoal({ dispatch, state }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <button onClick={() => setIsActive((isActive) => !isActive)}>
        Add a goal
      </button>
      {isActive ? (
        <form
          onSubmit={(event) =>
            dispatch({ type: "goalAccepted", payload: event })
          }
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
                type: "setGoalType",
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
                  type: "setGoalName",
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
                    type: "setGoalFood",
                    payload: Number(event.target.value),
                  })
                }
              />
              <input
                value={state.goalWood ? state.goalWood : ""}
                placeholder="Wood"
                onChange={(event) =>
                  dispatch({
                    type: "setGoalWood",
                    payload: Number(event.target.value),
                  })
                }
              />
              <input
                value={state.goalGold ? state.goalGold : ""}
                placeholder="Gold"
                onChange={(event) =>
                  dispatch({
                    type: "setGoalGold",
                    payload: Number(event.target.value),
                  })
                }
              />
              <input
                value={state.goalStone ? state.goalStone : ""}
                placeholder="Stone"
                onChange={(event) =>
                  dispatch({
                    type: "setGoalStone",
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
