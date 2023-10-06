// Import necessary libraries for the component
import { useState } from "react";
import "../index.css";
import DescriptionBox from "../components/BasicCustomComponents/DescriptionBox";
// import AoE4TargetFireTool from "./AoE4TargetFireTool";
// import AoE4EconomyBuilder from "../components/AoE4EconomyBuilder/AoE4EconomyBuilder-v2";
import PortfolioProject from "../components/PortfolioProject";
import PortfolioProjectCategory from "../components/PortfolioProjectCategory";
import PortfolioHeader from "../components/PortfolioHeader";
import Button from "../components/BasicCustomComponents/Button";
// import ConwayGameOfLife from "./ConwayGameOfLife";

function Homepage() {
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
      {curSelectedPortfolioCategory === "" && <PortfolioHeader />}
      {(curSelectedPortfolioCategory === "" ||
        curSelectedPortfolioCategory === "Games: projects and tools") && (
        <PortfolioProjectCategory
          categoryName={"Games: projects and tools"}
          onSetCurSelectedPortfolioCategory={
            handleSetCurSelectedPortfolioCategory
          }
        >
          {(curSelectedPortfolioProject === "" ||
            curSelectedPortfolioProject === "AoE4TargetFireTool") && (
            <PortfolioProject
              project="/aoe4targetfiretool"
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
          {/* 
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
          )} */}
          {(curSelectedPortfolioProject === "" ||
            curSelectedPortfolioProject === "Conway's Game of Life") && (
            <PortfolioProject
              project="/conwaygameoflife"
              projectName={"Conway's Game of Life"}
              onSetCurSelectedPortfolioProject={
                handleSetCurSelectedPortfolioProject
              }
            >
              <DescriptionBox
                title={<h3>Description:</h3>}
                collapsedNumWords={15}
              >
                <p>
                  This is a React game project, a simplistic Conways game of
                  life using React. Done as a challenge and homework project as
                  part of studies.
                </p>
              </DescriptionBox>
            </PortfolioProject>
          )}
        </PortfolioProjectCategory>
      )}

      {(curSelectedPortfolioCategory === "" ||
        curSelectedPortfolioCategory ===
          "Entry Challenges: Gambit TUF API") && (
        <PortfolioProjectCategory
          categoryName={"Entry Challenges: Gambit TUF API"}
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

export default Homepage;
