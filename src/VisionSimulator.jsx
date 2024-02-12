import React, { useState, useEffect } from 'react';

function VisionSimulator() {
  const [text, setText] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [nightMode, setNightMode] = useState(false);
  const [fontType, setFontType] = useState('sans-serif'); // Default to sans-serif
  const [textStyle, setTextStyle] = useState({});
  const [containerStyle, setContainerStyle] = useState({});

  useEffect(() => {
    const blur = Math.max(0, 5 - (sliderValue / 20));
    const size = 16 + (sliderValue / 5);
    const contrast = nightMode ? 70 : 100 + (sliderValue * 0.5);
    const fontWeight = sliderValue > 50 ? 400 : 700;
    const lineHeight = 1.4 + (sliderValue / 100);
    const backgroundColor = nightMode ? '#282c34' : `hsl(${210 + (sliderValue / 100) * 30}, 100%, ${90 - (sliderValue / 100) * 10}%)`;
    const color = nightMode ? '#ffffff' : `hsl(${210 + (sliderValue / 100) * 30}, 100%, ${10 + (sliderValue / 100) * 40}%)`;

    setTextStyle({
      filter: `blur(${blur}px) contrast(${contrast}%)`,
      fontSize: `${size}px`,
      fontWeight: fontWeight,
      lineHeight: `${lineHeight}`,
      color: color,
      fontFamily: fontType,
    });

    setContainerStyle({
      backgroundColor: backgroundColor,
      padding: '20px',
      borderRadius: '5px',
    });
  }, [sliderValue, nightMode, fontType]);

  return (
    <div style={containerStyle}>
      <h2>Vision Effect Simulator</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>Night Mode: </label>
        <input
          type="checkbox"
          checked={nightMode}
          onChange={() => setNightMode(!nightMode)}
        />
        <label>Font Type: </label>
        <select value={fontType} onChange={(e) => setFontType(e.target.value)}>
          <option value="sans-serif">Sans-serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          {/* Add more font options as needed */}
        </select>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
        style={{ ...textStyle, width: '100%', minHeight: '100px', marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={(e) => setSliderValue(e.target.value)}
        style={{ width: '100%' }}
      />
      <div style={textStyle}>
        {text}
      </div>
    </div>
  );
}

export default VisionSimulator;
