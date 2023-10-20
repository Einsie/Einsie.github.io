import { useConwayEngine } from "../../contexts/ConwayEngineContext";

function UrlManager() {
  const { queryString, dispatch, alivePixels } = useConwayEngine();
  return (
    <div>
      {queryString && (
        <>
          <textarea value={queryString} readOnly={true} />
          <br />
        </>
      )}{" "}
      <button
        onClick={() => dispatch({ type: "queryString/set" })}
        disabled={!alivePixels.length > 0}
      >
        generate URL
      </button>
      <button
        onClick={() => dispatch({ type: "queryString/clear" })}
        disabled={!queryString}
      >
        clear URL
      </button>
      <button
        onClick={() => {
          navigator.clipboard.writeText(queryString);
        }}
        disabled={!queryString}
      >
        copy URL
      </button>
      <br />
    </div>
  );
}

export default UrlManager;
