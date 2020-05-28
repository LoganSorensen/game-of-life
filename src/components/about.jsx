import React from "react";

const About = () => {
  return (
    <div className="rules">
      <h2>Rules</h2>
      <ul className="rules-list">
        <li>
          Any living cell with fewer than two living neighbors will die, as if
          by underpopulation.
        </li>
        <li>
          Any living cell with either two or three living neighbors will survive
          to the next generation.
        </li>
        <li>
          Any living cell with three or more neighbors will die, as if by
          overpopulation.
        </li>
        <li>
          Any dead cell with exactly three living neighbors will become a living
          cell, as if by reproduction.
        </li>
      </ul>
      <div className="about-section">
        <h2>About</h2>
        <p>
          Conway's "Game of Life" is a cellular automaton created by the British
          Mathematician John Conway. The game is comprised of a potentially
          infinite number of "cells", each of which have two states, alive or
          dead. The state of each of these cells is determined by the number of neighbors, as outlined in the rules above. By applying these simple rules, a number of patterns can be generated, as cells begin interacting with one another This may result in the death of all cells in a matter of generations, or an infinte loop of new patterns. 
        </p>
      </div>
    </div>
  );
};

export default About;
