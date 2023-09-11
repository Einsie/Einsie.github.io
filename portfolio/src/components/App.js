/* This is the primary React App component for the index where individual projects will be inserted
      App being the default function being exported from the component
      to index.js */

// Import necessary libraries for the component
import { useState } from "react";
import "./styles.css";
import DescriptionBox from "./BasicCustomComponents/DescriptionBox";
import AoE4TargetFireTool from "./AoE4TargetFireTool/AoE4TargetFireTool";
import AoE4EconomyBuilder from "./AoE4EconomyBuilder/AoE4EconomyBuilder";
import PortfolioProject from "./PortfolioProject";
import PortfolioProjectCategory from "./PortfolioProjectCategory";
import Header from "./Header";
import Button from "./BasicCustomComponents/Button";

// App is the default functin being exported from the component
export default function App() {
  // Declare a state variable for opening and closing project with Button
  const [curSelectedPortfolioProject, setCurSelectedPortfolioProject] =
    useState("");
  const [curSelectedPortfolioCategory, setCurSelectedPortfolioCategory] =
    useState("");

  function handleSetCurSelectedPortfolioProject(curOpenProjectName) {
    setCurSelectedPortfolioProject(curOpenProjectName);
  }
  function handleSetCurSelectedPortfolioCategory(curOpenCategoryName) {
    setCurSelectedPortfolioCategory(curOpenCategoryName);
    curOpenCategoryName === "" && setCurSelectedPortfolioProject("");
  }

  // The returned JSX element
  return (
    <div className="app">
      {curSelectedPortfolioCategory === "" && <Header />}
      {(curSelectedPortfolioCategory === "" ||
        curSelectedPortfolioCategory === "Game: Age of Empires 4") && (
        <PortfolioProjectCategory
          categoryName={"Game: Age of Empires 4"}
          onSetCurSelectedPortfolioCategory={
            handleSetCurSelectedPortfolioCategory
          }
        >
          {(curSelectedPortfolioProject === "" ||
            curSelectedPortfolioProject === "AoE4TargetFireTool") && (
            <PortfolioProject
              project={<AoE4TargetFireTool />}
              projectName={"AoE4TargetFireTool"}
              onSetCurSelectedPortfolioProject={
                handleSetCurSelectedPortfolioProject
              }
            >
              <DescriptionBox
                title={<h3>Description:</h3>}
                collapsedNumWords={15}
              >
                <p>
                  This is a React project, meant for calculating the winner of
                  two ranged armies, when they have queued target fire commands
                  on one another (All soldiers of an army targets singular
                  soldier of the opponent army, until it is dead, before moving
                  on to target the next soldier).
                </p>
                <p>
                  Tool primarily meant for a game called Age of Empires 4, but
                  can be used for other RTS with similar mechanics.
                </p>
                <p>
                  The calculations require two armies to be inserted before they
                  can be compared
                </p>
              </DescriptionBox>
            </PortfolioProject>
          )}
          {(curSelectedPortfolioProject === "" ||
            curSelectedPortfolioProject === "AoE4EconomyBuilder") && (
            <PortfolioProject
              project={<AoE4EconomyBuilder />}
              projectName={"AoE4EconomyBuilder"}
              onSetCurSelectedPortfolioProject={
                handleSetCurSelectedPortfolioProject
              }
            >
              <DescriptionBox
                title={<h3>Description:</h3>}
                collapsedNumWords={15}
              >
                <p>
                  This is a React project, meant for figuring out how your
                  economy grows, so you can step by step create a build order
                  with your current economy in mind.
                </p>
                <p>
                  Tool primarily meant for a game called Age of Empires 4, but
                  can be used for other RTS with similar mechanics.
                </p>
              </DescriptionBox>
            </PortfolioProject>
          )}
        </PortfolioProjectCategory>
      )}
      {(curSelectedPortfolioCategory === "" ||
        curSelectedPortfolioCategory === "Entry Challenge: Gambit TUF API") && (
        <PortfolioProjectCategory
          categoryName={"Entry Challenge: Gambit TUF API"}
          onSetCurSelectedPortfolioCategory={
            handleSetCurSelectedPortfolioCategory
          }
        >
          <br />
          <div style={{ borderStyle: "groove" }}>
            <Button
              onClick={() =>
                window.open(
                  "https://github.com/Einsie/EntryProject_TUFAPI",
                  "_blank",
                  "noreferrer"
                )
              }
              extraStyling={{ marginTop: "5px" }}
            >
              Click to open Git repository in new window
            </Button>
            <DescriptionBox
              title={<h3>Description:</h3>}
              collapsedNumWords={15}
              expanded={true}
            >
              <p>
                This is a .Net Core Rest api project using C#, created as part
                of an entry challenge to Gambit.
              </p>
              <p>
                Clicking the button for this project, will link you to the
                github repository this project exists in. Api currently not
                running online for testing.
              </p>
            </DescriptionBox>
          </div>
        </PortfolioProjectCategory>
      )}
    </div>
  );
}
