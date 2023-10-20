import { useTargetFireTool } from "../../../contexts/TargetFireToolContext";
import Button from "../../BasicCustomComponents/Button";
import CurrentArmiesListItem from "./CurrentArmiesListItem";

export default function CurrentArmiesList() {
  const { armies, dispatch } = useTargetFireTool();
  return (
    <ul>
      {armies.map((army) => (
        <CurrentArmiesListItem army={army} key={army.name}>
          <Button
            onClick={() =>
              dispatch({ type: "curEditArmy/use/army", payload: army })
            }
          >
            Edit
          </Button>
        </CurrentArmiesListItem>
      ))}
    </ul>
  );
}
