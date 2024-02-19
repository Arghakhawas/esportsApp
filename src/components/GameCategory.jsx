// GameCategory.jsx
import React from 'react';

const GameCategory = ({ category, onAddClick }) => {
  return (
    <div className="game-category">
      <h3>{category}</h3>
      <button onClick={onAddClick}>Add</button>
    </div>
  );
};

export default GameCategory;
