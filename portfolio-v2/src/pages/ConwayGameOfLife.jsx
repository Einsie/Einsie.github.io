import styles from "./ConwayGameOfLife.module.css";
import GameScreen from "../components/ConwayGameOfLife/GameScreen";
import Timer from "../components/ConwayGameOfLife/Timer";
import ProjectContainer from "../components/BasicCustomComponents/ProjectContainer";
import NavBar from "../components/BasicCustomComponents/NavBar";
import UrlManager from "../components/ConwayGameOfLife/UrlManager";
import GameSettings from "../components/ConwayGameOfLife/GameSettings";
import GameControls from "../components/ConwayGameOfLife/GameControls";
import { useConwayEngine } from "../hooks/useConwayEngine";

/*
Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
These rules, which compare the behaviour of the automaton to real life, can be condensed into the following:

Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/

function ConwayGameOfLife() {
  const { isRunning } = useConwayEngine();

  return (
    <>
      <NavBar />
      <ProjectContainer>
        <h1>Iconic Conways Game of Life done in React</h1>
        <h4>
          To play the game, click pixels to turn them alive. Then click the
          start the game button
        </h4>
        <h4 className={styles.urlTextarea}>
          You can also hold down control key and hover over pixels to turn them
          alive and drag as you wish.
        </h4>
        <h4>
          By generating an url after creating shape of your choise, you can use
          the given URL, to return to APP with your created shape intact. Good
          for sharing your creation with your friends as well.
        </h4>
        {!isRunning && (
          <>
            <UrlManager />
            <GameSettings />
          </>
        )}
        <GameControls />

        <Timer />
        <GameScreen />
        <br />
      </ProjectContainer>
    </>
  );
}

export default ConwayGameOfLife;
