/* This AddArmyForm is used to add a new army to parent states
        of presetArmies or armies with form data */

// Import necessary libraries for component
import Button from "../BasicCustomComponents/Button";
import TextInput from "../BasicCustomComponents/TextInput";
import DescriptionBox from "../BasicCustomComponents/DescriptionBox";
import { useTargetFireTool } from "../../hooks/useTargetFireTool";

//AddArmyForm is the default function being exported by the component
//destructure the prop into necessary parameters being used
export default function AddArmyForm() {
  const { curEditArmy, dispatch } = useTargetFireTool();
  // Declare a boolean for clear button to be displayed if form has data
  const hasFormData =
    curEditArmy.name !== "" ||
    curEditArmy.damage !== "" ||
    curEditArmy.attackSpeed !== "" ||
    curEditArmy.health !== "" ||
    curEditArmy.armor !== "" ||
    curEditArmy.quantity !== "" ||
    curEditArmy.range !== "";

  return (
    <div className="tool-component">
      <DescriptionBox collapsedNumWords={21}>
        <p>
          Use this form to add an army to your army list below. Presets can be
          found from sidebar on the left.
        </p>
        <p>
          Negative values or empty fields will be turned to default of 1. These
          restrictions do not apply to adding a new preset.
        </p>
        <p>
          Range of 0 means the army will not attack. For example, you can use
          this for buildings or for firing at melee armies.
        </p>
      </DescriptionBox>
      <form
        onSubmit={(event) => dispatch({ type: "armies/add", payload: event })}
      >
        <TextInput
          placeholder={"Name* required"}
          value={curEditArmy.name}
          onChange={(event) =>
            dispatch({
              type: "curEditArmy/set/name",
              payload: event.target.value,
            })
          }
        />
        <TextInput
          placeholder={"damage: default 1"}
          value={curEditArmy.damage}
          onChange={(event) =>
            dispatch({
              type: "curEditArmy/set/damage",
              payload: event.target.value,
            })
          }
        />
        <TextInput
          placeholder={"attackSpeed: default 1"}
          value={curEditArmy.attackSpeed}
          onChange={(event) =>
            dispatch({
              type: "curEditArmy/set/attackSpeed",
              payload: event.target.value,
            })
          }
        />
        <TextInput
          placeholder={"health: default 1"}
          value={curEditArmy.health}
          onChange={(event) =>
            dispatch({
              type: "curEditArmy/set/health",
              payload: event.target.value,
            })
          }
        />
        <TextInput
          placeholder={"armor: default 0"}
          value={curEditArmy.armor}
          onChange={(event) =>
            dispatch({
              type: "curEditArmy/set/armor",
              payload: event.target.value,
            })
          }
        />
        <TextInput
          placeholder="quantity: default 1"
          value={curEditArmy.quantity}
          onChange={(event) =>
            dispatch({
              type: "curEditArmy/set/quantity",
              payload: event.target.value,
            })
          }
        />
        <TextInput
          placeholder="range: default 0"
          value={curEditArmy.range}
          onChange={(event) =>
            dispatch({
              type: "curEditArmy/set/range",
              payload: event.target.value,
            })
          }
        />
        <div>
          <Button>Add army</Button>
          <Button
            onClick={(event) =>
              dispatch({ type: "preset/add", payload: event })
            }
          >
            Add to presets
          </Button>
          {hasFormData && (
            <Button
              onClick={(event) =>
                dispatch({ type: "curEditArmy/clear", payload: event })
              }
            >
              Clear
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
