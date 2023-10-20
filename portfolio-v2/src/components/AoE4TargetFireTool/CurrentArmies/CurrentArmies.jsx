/* ArmiesList component displays the armies currently added to list for
      comparison. It also checks how armies there are in the list and changes
      the content accordingly */

// Import necessary libraries for the component
import { useTargetFireTool } from "../../../contexts/TargetFireToolContext";
import Button from "../../BasicCustomComponents/Button";

// ArmiesList is the default function of the component being exported
//    destructure the propr for necessary parameters
export default function CurrentArmies({ children }) {
  const { armies, dispatch } = useTargetFireTool();
  return (
    <div className="tool-component">
      {armies.length > 0 ? (
        <>
          <p>💂‍♂️ List of current armies 💂‍♂️</p>
          {children}
          {armies.length === 1 && (
            <p>Add a second army and you&apos;re ready to go!</p>
          )}
          <Button onClick={() => dispatch({ type: "armies/clear" })}>
            Clear
          </Button>
        </>
      ) : (
        <p> Begin by adding your two armies to compare!</p>
      )}
    </div>
  );
}
