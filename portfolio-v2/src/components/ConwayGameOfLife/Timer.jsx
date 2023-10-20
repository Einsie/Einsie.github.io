import { useEffect } from "react";
import { useConwayEngine } from "../../contexts/ConwayEngineContext";

function Timer() {
  const { dispatch, isRunning, secondsRunning, gameSpeed } = useConwayEngine();

  const minutes = Math.floor(secondsRunning / 60);
  const seconds = secondsRunning % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "game/update" });
      }, gameSpeed);

      if (!isRunning) clearInterval(id);
      return () => clearInterval(id);
    },
    [isRunning, dispatch, gameSpeed]
  );

  return (
    <div>
      <strong>
        {minutes < 10 ? "0" : null}
        {minutes}
      </strong>
      :
      <strong>
        {seconds < 10 ? "0" : null}
        {seconds}
      </strong>
    </div>
  );
}

export default Timer;
