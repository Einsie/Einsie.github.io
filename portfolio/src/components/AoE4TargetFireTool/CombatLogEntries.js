import CombatLogEntry from "./CombatLogEntry";

export default function CombatLogEntries({ curCombatLog }) {
  return (<ul>
    <CombatLogEntry curLog={curCombatLog[2]} />
    <CombatLogEntry curLog={curCombatLog[3]} />
    <CombatLogEntry curLog={curCombatLog[4]} />
    <CombatLogEntry curLog={curCombatLog[5]} />
    <CombatLogEntry curLog={curCombatLog[curCombatLog.length - 1]} />
    {curCombatLog.map((curLog, index) => (index !== 0 && index !== 1 && index !== 2 && index !== 3 && index !== 4 && index !== 5 &&
      <CombatLogEntry curLog={curLog} key={index} />
    ))}
  </ul>);
}

