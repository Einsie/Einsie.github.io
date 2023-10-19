import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AoE4TargetFireTool from "./pages/AoE4TargetFireTool";
import ConwayGameOfLife from "./pages/ConwayGameOfLife";
import AoE4EconomyBuilder from "./pages/AoE4EconomyBuilder";
import { ConwayEngineProvider } from "./contexts/ConwayEngineContext";
import { TargetFireToolProvider } from "./contexts/TargetFireToolContext";

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route
        path="aoe4targetfiretool"
        element={
          <TargetFireToolProvider>
            <AoE4TargetFireTool />
          </TargetFireToolProvider>
        }
      />
      <Route
        path="conwaygameoflife"
        element={
          <ConwayEngineProvider>
            <ConwayGameOfLife />
          </ConwayEngineProvider>
        }
      />
      <Route path="aoe4economybuilder" element={<AoE4EconomyBuilder />} />
    </Routes>
  );
}

export default App;
