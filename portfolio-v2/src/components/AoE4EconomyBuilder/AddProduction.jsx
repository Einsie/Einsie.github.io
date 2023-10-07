import { useState } from "react";
import SelectOptionInput from "../BasicCustomComponents/SelectOptionInput";

import {
  TownCenter,
  Market,
  Dock,
  OtherProduction,
} from "./AoE4EconomyBuilder-v1";

export function AddProduction({ onAddProduction }) {
  const [formData, setFormData] = useState({
    productionType: "TownCenter",
    OtherProductionName: "",
    productionCall: TownCenter,
    foodCost: 0,
    woodCost: 0,
    goldCost: 0,
    stoneCost: 0,
    secondsToBuild: 0,
    idleVillagersNeeded: 0,
  });

  function handleSubmit(event) {
    event.preventDefault();

    onAddProduction(formData);
    setFormData({
      productionType: "TownCenter",
      OtherProductionName: "",
      productionCall: TownCenter,
      foodCost: 0,
      woodCost: 0,
      goldCost: 0,
      stoneCost: 0,
      secondsToBuild: 0,
      idleVillagersNeeded: 0,
    });
  }

  function handleOnChange(data) {
    setFormData((curFormData) => {
      return { ...curFormData, ...data };
    });
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <SelectOptionInput
        value={formData.productionType}
        options={["Town Center", "Market", "Dock", "Other Production"]}
        placeholder="production type"
        onChange={(customReturnObject) =>
          handleOnChange({
            productionType: customReturnObject.event.target.value,
            productionCall: customReturnObject.customReturn,
          })
        }
        customReturnValues={[TownCenter, Market, Dock, OtherProduction]}
      />
      {formData.productionType === "Other Production" && (
        <input
          value={
            formData.OtherProductionName === 0
              ? ""
              : formData.OtherProductionName
          }
          placeholder="other production name"
          onChange={(event) =>
            handleOnChange({ OtherProductionName: event.target.value })
          }
        />
      )}
      <br />
      <input
        value={formData.foodCost === 0 ? "" : formData.foodCost}
        placeholder="food cost"
        onChange={(event) =>
          !isNaN(event.target.value) &&
          handleOnChange({ foodCost: Number(event.target.value) })
        }
      />
      <input
        value={formData.woodCost === 0 ? "" : formData.woodCost}
        placeholder="wood cost"
        onChange={(event) =>
          !isNaN(event.target.value) &&
          handleOnChange({ woodCost: Number(event.target.value) })
        }
      />
      <input
        value={formData.goldCost === 0 ? "" : formData.goldCost}
        placeholder="gold cost"
        onChange={(event) =>
          !isNaN(event.target.value) &&
          handleOnChange({ goldCost: Number(event.target.value) })
        }
      />
      <input
        value={formData.stoneCost === 0 ? "" : formData.stoneCost}
        placeholder="stone cost"
        onChange={(event) =>
          !isNaN(event.target.value) &&
          handleOnChange({ stoneCost: Number(event.target.value) })
        }
      />
      <input
        value={formData.secondsToBuild === 0 ? "" : formData.secondsToBuild}
        placeholder="seconds to build"
        onChange={(event) =>
          !isNaN(event.target.value) &&
          handleOnChange({ secondsToBuild: Number(event.target.value) })
        }
      />
      <input
        value={
          formData.idleVillagersNeeded === 0 ? "" : formData.idleVillagersNeeded
        }
        placeholder="idle villagers to build"
        onChange={(event) =>
          !isNaN(event.target.value) &&
          handleOnChange({ idleVillagersNeeded: Number(event.target.value) })
        }
      />
      <button type="submit">Add</button>
    </form>
  );
}
