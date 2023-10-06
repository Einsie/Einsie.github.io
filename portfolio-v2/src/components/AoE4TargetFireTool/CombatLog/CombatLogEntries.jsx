import CombatLogEntry from "./CombatLogEntry";

export default function CombatLogEntries({ curCombatLog }) {
  return (
    <ul>
      <CombatLogEntry curLog={curCombatLog.name} />
      <CombatLogEntry curLog={curCombatLog.quantity} />
      <CombatLogEntry curLog={curCombatLog.loser} />
      <CombatLogEntry curLog={curCombatLog.loserQuantity} />
      <CombatLogEntry curLog={curCombatLog.battleSummary} />
      {curCombatLog.log.map((curLog, index) => (
        <CombatLogEntry curLog={curLog} key={index} />
      ))}
      <CombatLogEntry curLog={curCombatLog.battleSummary} />
    </ul>
  );
}
