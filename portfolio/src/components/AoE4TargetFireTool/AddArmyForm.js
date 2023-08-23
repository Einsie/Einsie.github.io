/* This AddArmyForm is used to add a new army to parent states
        of presetArmies or armies with form data */

// Import necessary libraries for component
import Button from "../BasicCustomComponents/Button";
import TextInput from "../BasicCustomComponents/TextInput";
import DescriptionBox from "../BasicCustomComponents/DescriptionBox";

//AddArmyForm is the default function being exported by the component
//destructure the prop into necessary parameters being used
export default function AddArmyForm({
  armies,
  onAddArmy,
  curEditArmy,
  onEditCurArmy,
  presetArmies,
  onAddPresetArmy,
}) {
  // Declare a boolean for clear button to be displayed if form has data
  const hasFormData =
    curEditArmy.name !== "" ||
    curEditArmy.damage !== "" ||
    curEditArmy.attackSpeed !== "" ||
    curEditArmy.health !== "" ||
    curEditArmy.armor !== "" ||
    curEditArmy.quantity !== "" ||
    curEditArmy.range !== "";

  // Control the form element with states owned by parent element
  // handler functions are used to communicate and refine data before
  //    sending them to parent for state updates

  // setTrueId sets the crypto key as a unique id for the army,
  //    updated each time a change has been made to the form
  //    passes the updated army with new trueId to parent
  function setTrueId(value) {
    onEditCurArmy((curEditArmy) => true && { ...curEditArmy, trueId: value });
  }

  //  handleSetName updates the trueId and passes an updated army with new name to parent
  function handleSetName(value) {
    setTrueId(crypto.randomUUID());
    onEditCurArmy((curEditArmy) => true && { ...curEditArmy, name: value });
  }

  //  handleSetDamage updates the trueId and passes an updated army with new damage to parent
  function handleSetDamage(value) {
    setTrueId(crypto.randomUUID());
    onEditCurArmy((curEditArmy) => true && { ...curEditArmy, damage: value });
  }

  //  handleSetAttackSpeed updates the trueId and passes an updated army with new attackSpeed to parent
  function handleSetAttackSpeed(value) {
    setTrueId(crypto.randomUUID());
    onEditCurArmy(
      (curEditArmy) => true && { ...curEditArmy, attackSpeed: value }
    );
  }
  //  handleSetHealth updates the trueId and passes an updated army with new health to parent
  function handleSetHealth(value) {
    setTrueId(crypto.randomUUID());
    onEditCurArmy((curEditArmy) => true && { ...curEditArmy, health: value });
  }

  //  handleSetArmor updates the trueId and passes an updated army with new armor to parent
  function handleSetArmor(value) {
    setTrueId(crypto.randomUUID());
    onEditCurArmy((curEditArmy) => true && { ...curEditArmy, armor: value });
  }

  //  handleSetQuantity updates the trueId and passes an updated army with new quantity to parent
  function handleSetQuantity(value) {
    setTrueId(crypto.randomUUID());
    onEditCurArmy((curEditArmy) => true && { ...curEditArmy, quantity: value });
  }

  //  handleSetRange updates the trueId and passes an updated army with new range to parent
  function handleSetRange(value) {
    setTrueId(crypto.randomUUID());
    onEditCurArmy((curEditArmy) => true && { ...curEditArmy, range: value });
  }

  // handleSubmit handles the form submission while preventing default behavior of an unnecessary re-render
  // During submission the army properties are defaulted if they are not above 0
  //    and also transforms the values from strings to Numbers.
  //        This is only done here to allow input of decimals in the form
  function handleSubmit(event) {
    event.preventDefault();
    if (armies.length > 1 || curEditArmy.name === "") return;
    const newArmy = {
      id: armies.length,
      trueId: curEditArmy.trueId,
      name: curEditArmy.name,
      damage: curEditArmy.damage > 0 ? Number(curEditArmy.damage) : 1,
      attackSpeed:
        curEditArmy.attackSpeed > 0 ? Number(curEditArmy.attackSpeed) : 1,
      health: curEditArmy.health > 0 ? Number(curEditArmy.health) : 1,
      armor: curEditArmy.armor > 0 ? Number(curEditArmy.armor) : 0,
      quantity: curEditArmy.quantity > 0 ? Number(curEditArmy.quantity) : 1,
      range: curEditArmy.range > 0 ? Number(curEditArmy.range) : 0,
    };
    // Pass the newly created army to parent and reset the form through state held by parent
    onAddArmy([...armies, newArmy]);
    handleClear();
  }

  // handleAddPreset handles the addition of form data as a preset
  //    while preventing default behavior of re-render just in case
  function handleAddPreset(event) {
    event.preventDefault();

    if (curEditArmy.name === "") return;
    const newPreset = {
      id: presetArmies.length,
      trueId: curEditArmy.trueId,
      name: curEditArmy.name,
      damage: curEditArmy.damage,
      attackSpeed: curEditArmy.attackSpeed,
      health: curEditArmy.health,
      armor: curEditArmy.armor,
      quantity: curEditArmy.quantity,
      range: curEditArmy.range,
      isPreset: true,
    };

  //pass on the newly created army preset to parent state if the trueId does not exist in
  //    the current presets yet.
    !presetArmies.reduce(
      (acc, preset) => preset.trueId === newPreset.trueId || acc,
      false
    ) && onAddPresetArmy([...presetArmies, newPreset]);
  }

  // handleClear handles the clear button behaviour, setting all form
  //    values held by parent state to default
  function handleClear() {
    setTrueId(crypto.randomUUID());
    handleSetName("");
    handleSetDamage("");
    handleSetAttackSpeed("");
    handleSetHealth("");
    handleSetArmor("");
    handleSetQuantity("");
    handleSetRange("");
  }

  return (
    <div className="tool-component">
      <DescriptionBox>
        <p>
          Use this form to add an army to your army list below. Presets can be
          found from sidebar on the left.
        </p>
        <p>
          Negative values or empty fields will be turned to default of 1. These
          restrictions do not apply to adding a new preset.
        </p>
        <p>
          Range of 0 means the army will not attack. For example, you can use this
          for buildings or for firing at melee armies.
        </p>
      </DescriptionBox> 
      <form onSubmit={handleSubmit}>
        <TextInput placeholder={"Name* required"} value={curEditArmy.name} onChange={(event) => handleSetName(event.target.value)}/>
        <TextInput
          placeholder={"damage: default 1"}
          value={curEditArmy.damage}
          onChange={(event) =>
            handleSetDamage(
              isNaN(Number(event.target.value)) ? "" : event.target.value
            )
          }
        />
        <TextInput
          placeholder={"attackSpeed: default 1"}
          value={curEditArmy.attackSpeed}
          onChange={(event) =>
            handleSetAttackSpeed(
              isNaN(Number(event.target.value)) ? "" : event.target.value
            )
          }
        />
        <TextInput
          placeholder={"health: default 1"}
          value={curEditArmy.health}
          onChange={(event) =>
            handleSetHealth(
              isNaN(Number(event.target.value)) ? "" : event.target.value
            )
          }
        />
        <TextInput
          placeholder={"armor: default 0"}
          value={curEditArmy.armor}
          onChange={(event) =>
            handleSetArmor(
              isNaN(Number(event.target.value)) ? "" : event.target.value
            )
          }
        />
        <TextInput
          placeholder="quantity: default 1"
          value={curEditArmy.quantity}
          onChange={(event) =>
            handleSetQuantity(
              isNaN(Number(event.target.value)) ? "" : event.target.value
            )
          }
        />
        <TextInput
          placeholder="range: default 0"
          value={curEditArmy.range}
          onChange={(event) =>
            handleSetRange(
              isNaN(Number(event.target.value)) ? "" : event.target.value
            )
          }
        />
        <Button>Add army</Button>
        <Button onClick={handleAddPreset}>Add to presets</Button>
        {hasFormData && <Button onClick={handleClear}>Clear</Button>}
      </form>
    </div>
  );
}