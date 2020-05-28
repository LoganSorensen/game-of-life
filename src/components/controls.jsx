import React from "react";

const Controls = ({
  numRows,
  numCols,
  running,
  setRunning,
  setGrid,
  runningRef,
  runSimulation,
  population,
}) => {
  return (
    <div className="btn-container">
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          if (!running) {
            runSimulation();
          }
        }}
        style={running ? {cursor: 'not-allowed'} : undefined}
      >
        Next Generation
      </button>

      <button
        onClick={() => {
          if (!running) {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > (population / 100) ? 0 : 1))
              );
            }
            setGrid(rows);
          }
        }}
        style={running ? {cursor: 'not-allowed'} : undefined}
      >
        Random
      </button>
    </div>
  );
};

export default Controls;
