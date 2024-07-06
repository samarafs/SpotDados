import React, { useState } from 'react';

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
};

const HexadecimalColorGenerator = () => {
  const [colors, setColors] = useState(Array(5).fill().map(() => generateRandomColor()));
  const [locked, setLocked] = useState(Array(5).fill(false));

  const handleColorClick = (index) => {
    const newLocked = [...locked];
    newLocked[index] = !locked[index];
    setLocked(newLocked);
  };

  const handleRandomizeColors = () => {
    const newColors = colors.map((color, index) => {
      if (locked[index]) {
        return color; // Keep locked colors unchanged
      } else {
        return generateRandomColor(); // Generate new random colors for unlocked colors
      }
    });
    setColors(newColors);
  };

  return (
    <div className='flex flex-col'>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color, padding: '10px', margin: '5px', cursor: 'pointer' }}
          onClick={() => handleColorClick(index)}
        >
          {color}
        </div>
      ))}
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleRandomizeColors}>Randomize Unlocked Colors</button>
    </div>
  );
};

export default HexadecimalColorGenerator;
