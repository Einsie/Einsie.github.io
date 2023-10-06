import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AoE4TargetFireTool from "./pages/AoE4TargetFireTool";
import ConwayGameOfLife from "./pages/ConwayGameOfLife";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="aoe4targetfiretool" element={<AoE4TargetFireTool />} />
        <Route path="conwaygameoflife" element={<ConwayGameOfLife />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
