import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AoE4TargetFireTool from "./pages/AoE4TargetFireTool";
import ConwayGameOfLife from "./pages/ConwayGameOfLife";
import AoE4EconomyBuilder from "./pages/AoE4EconomyBuilder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="aoe4targetfiretool" element={<AoE4TargetFireTool />} />
        <Route path="conwaygameoflife" element={<ConwayGameOfLife />} />
        <Route path="aoe4economybuilder" element={<AoE4EconomyBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
