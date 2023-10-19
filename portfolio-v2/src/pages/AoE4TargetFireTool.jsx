/* AoE4TargetFireTool is the primary project parent component that displays everything.
        it also holds all lifted up states which need to be shared between multiple
        child components, while also handling most of the state edits and passing
        the handler functions to children.

  Project summary:
      This is a React project, meant for calculating the winner of two
      armies, when they have queued target fire commands on one another
      (All soldiers of an army targets singular soldier of the opponent
      army, until it is dead, before moving on to target the next
      soldier). Tool primarily meant for a game called Age of Empires 4,
      but can be used for other RTS with similar mechanics. */

// Import necessary libraries for the component
import AddArmyForm from "../components/AoE4TargetFireTool/AddArmyForm";
import ArmyComparison from "../components/AoE4TargetFireTool/ArmyComparison";
import CurrentArmies from "../components/AoE4TargetFireTool/CurrentArmies/CurrentArmies";
import SideBar from "../components/AoE4TargetFireTool/SideBar/SideBar";
import CombatLog from "../components/AoE4TargetFireTool/CombatLog/CombatLog";
import CurrentArmiesList from "../components/AoE4TargetFireTool/CurrentArmies/CurrentArmiesList";
import CombatLogEntries from "../components/AoE4TargetFireTool/CombatLog/CombatLogEntries";
import ProjectContainer from "../components/BasicCustomComponents/ProjectContainer";
import NavBar from "../components/BasicCustomComponents/NavBar";
import { useTargetFireTool } from "../hooks/useTargetFireTool";

// AoE4TargetFireTool is the default function being exported
export default function AoE4TargetFireTool() {
  const { presetArmies, combatlogHistory, curCombatLog, armies, dispatch } =
    useTargetFireTool();
  // return the jsx components with necessary props they need
  return (
    <>
      <NavBar />
      <ProjectContainer>
        <SideBar
          position={"left"}
          array={presetArmies}
          onUse={"curEditArmy/use/preset"}
          onRemove={"preset/remove"}
          dispatch={dispatch}
          key={`unitpresets${presetArmies.length}`}
        >
          <p>Unit Presets</p>
        </SideBar>

        <SideBar
          position={"right"}
          array={combatlogHistory}
          onUse={"curCombatLog/set"}
          onRemove={"combatLogHistory/remove"}
          dispatch={dispatch}
          key={`combatlogs${combatlogHistory.length}`}
        >
          <p>Combat log history</p>
        </SideBar>

        <div className="inliner target-fire-tool">
          <h1>Age of Empires 4 🏰</h1>
          <h3>🏹 Target fire comparison tool for ranged armies 🏹</h3>

          {armies.length < 2 && <AddArmyForm />}

          <CurrentArmies>
            <CurrentArmiesList />
          </CurrentArmies>

          {armies.length > 0 && <ArmyComparison />}

          {curCombatLog.log.length > 0 && (
            <CombatLog>
              <CombatLogEntries />
            </CombatLog>
          )}
        </div>
      </ProjectContainer>
    </>
  );
}
