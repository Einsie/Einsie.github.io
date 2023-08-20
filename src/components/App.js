/* This is the primary React App component for the index where individual projects will be inserted
      App being the default function being exported from the component
      to index.js */

// Import necessary libraries for the component
import { useState } from "react";
import "./styles.css";
import AoE4TargetFireTool from "./AoE4TargetFireTool/AoE4TargetFireTool";
import Button from "./Button";

// App is the default functin being exported from the component
export default function App() {
  // Declare a state variable for opening and closing project with Button
  const [AoE4TargetFireToolIsOpen, setAoE4TargetFireToolIsOpen] =
    useState(false);

  // The returned JSX element
  return (
    <div className="app">
      {/* Button element for opening and closing project AoE4TargetFireTool */}
      <Button
        onClick={() => setAoE4TargetFireToolIsOpen(!AoE4TargetFireToolIsOpen)}
      >
        {AoE4TargetFireToolIsOpen
          ? "Close project AoE4TargetFireTool"
          : "Open project AoE4TargetFireTool"}
      </Button>

      {
        /* Conditionally display AoE4TargetFireTool depending on state*/
        AoE4TargetFireToolIsOpen ? (
          <AoE4TargetFireTool />
        ) : (
          <div>
            Description:
            <p>
              This is a React project, meant for calculating the winner of two
              armies, when they have queued target fire commands on one another
              (All soldiers of an army targets singular soldier of the opponent
              army, until it is dead, before moving on to target the next
              soldier). Tool primarily meant for a game called Age of Empires 4,
              but can be used for other RTS with similar mechanics.
            </p>
            <p>
              The calculations require two armies to be inserted before they can
              be compared
            </p>
          </div>
        )
      }
    </div>
  );
}
