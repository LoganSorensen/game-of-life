import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import Rules from "./components/rules";
import Controls from "./components/controls";
import About from "./components/about";

import "./styles/less/index.less";

const numRows = 40;
const numCols = 50;
let generation = 0;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [modifiers, setModifiers] = useState({
    population: 50,
    speed: 1000,
  })

  const [cellSize, setCellSize] = useState(10);

  const [running, setRunning] = useState(false);

  const runningRef = useRef();
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    // const speed = modifiers.speed;
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    generation += 1;

    if (runningRef.current) {

      setTimeout(runSimulation, modifiers.speed);
    }
  }, [modifiers.speed]);

  const updateModifiers = e => {
    // console.log(e.target, e.target.value)
    setModifiers({...modifiers, [e.target.name]: Number(e.target.value)})
  }



  return (
    <>
      <div className="main-section">
        <div className="grid-container">
          <div className='grid-top'>
          <h2 className="generation-counter">Generation: {generation}</h2>
          <button
            onClick={() => {
              if (!running) {
                setGrid(generateEmptyGrid());
                generation = 0;
              }
            }}
            style={running ? {cursor: 'not-allowed'} : undefined}
          >
            Reset
          </button>
          </div>
          <div
            className="grid"
            style={{
              display: "grid",
              border: "1px solid black",
              gridTemplateColumns: `repeat(${numCols}, ${cellSize}px)`,
            }}
          >
            {grid.map((rows, i) =>
              rows.map((col, k) => (
                <div
                  className={grid[i][k] ? "alive" : "dead"}
                  key={`${i}-${k}`}
                  onClick={
                    !running
                      ? () => {
                          const newGrid = produce(grid, (gridCopy) => {
                            gridCopy[i][k] = grid[i][k] ? 0 : 1;
                          });
                          setGrid(newGrid);
                        }
                      : undefined
                  }
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: grid[i][k] ? "black" : undefined,
                    border: "1px solid white",
                  }}
                />
              ))
            )}
          </div>
          <Controls
            numRows={numRows}
            numCols={numCols}
            running={running}
            setRunning={setRunning}
            generateEmptyGrid={generateEmptyGrid}
            generation={generation}
            setGrid={setGrid}
            runningRef={runningRef}
            runSimulation={runSimulation}
            population={modifiers.population}
          />
          <div className='modifiers'>
            <div className='modifier'>
          <span>Population Density</span>
          <select defaultValue={50} name='population' onChange={updateModifiers}>
          <option value={10}>10%</option>
          <option value={20}>20%</option>
          <option value={30}>30%</option>
          <option value={40}>40%</option>
          <option value={50}>50% (default)</option>
          <option value={60}>60%</option>
          <option value={70}>70%</option>
          <option value={80}>80%</option>
          <option value={90}>90%</option>
          <option value={100}>100%</option>
          </select>
          </div>
          <div className='modifier'>
          <span>Simulation Speed in ms</span>
          <input type='number' name='speed' placeholder='1000' onChange={updateModifiers}></input>
          </div>
        </div>
        </div>
        
        <Rules />
      </div>
      <About />
    </>
  );
}

export default App;
