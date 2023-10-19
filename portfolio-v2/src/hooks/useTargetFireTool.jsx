import { useContext } from "react";
import { TargetFireToolContext } from "../contexts/TargetFireToolContext";

function useTargetFireTool() {
  const context = useContext(TargetFireToolContext);
  if (TargetFireToolContext === undefined)
    throw new Error(
      "TargetFireToolContext used outside TargetFireToolProvider"
    );

  return context;
}

export { useTargetFireTool };
