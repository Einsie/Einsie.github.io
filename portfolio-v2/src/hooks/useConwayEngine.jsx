import { useContext } from "react";
import { ConwayEngineContext } from "../contexts/ConwayEngineContext";

function useConwayEngine() {
  const context = useContext(ConwayEngineContext);
  if (context === undefined)
    throw new Error(
      "ConwayEngineContext was used outside ConwayEngineProvider"
    );
  return context;
}

export { useConwayEngine };
