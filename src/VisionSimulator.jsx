import React, { useState, useEffect } from 'react';

function VisionSimulator() {
  const [text, setText] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [nightMode, setNightMode] = useState(false);
  const [fontType, setFontType] = useState('sans-serif');
  const [visionRating, setVisionRating] = useState('');
  const [textStyle, setTextStyle] = useState({});
  const [containerStyle, setContainerStyle] = useState({});

  // Detailed vision rating based on slider value
  const calculateVisionRating = (value) => {
    if (value < 10) return '20/200 (Legally Blind)';
    if (value < 20) return '20/100 (Severe Vision Impairment)';
    if (value < 30) return '20/80 (Moderate Vision Impairment)';
    if (value < 40) return '20/50 (Mild Vision Impairment)';
    if (value < 50) return '20/40 (Near Normal Vision)';
    if (value < 60) return '20/30 (Above Average Vision)';
    if (value < 70) return '20/25 (Slighty Above Average Vision)';
    if (value <= 100) return '20/20 (Normal Vision)';
  };

  useEffect(() => {
    const blur = Math.max(0, 4 - (sliderValue / 25)); // Adjust blur effect based on slider
    const size = 16 + (sliderValue / 5); // Dynamic size adjustment
    const contrast = 100 + (sliderValue * 0.75); // Adjust contrast for readability
    const fontWeight = sliderValue > 50 ? '400' : '700'; // Adjust weight based on readability preference
    const lineHeight = 1.4 + (sliderValue / 100); // Adjust line height for readability

    // Night mode adjustments
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

    // Update vision rating as the slider moves
    setVisionRating(calculateVisionRating(sliderValue));
  }, [sliderValue, nightMode, fontType]);

  return (
    <div style={containerStyle}>
      <h2>Vision Effect Simulator</h2>
      <div>
        Vision Rating: <strong>{visionRating}</strong>
      </div>
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
          {/* Additional font options can be added here */}
        </select>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
        style={{ ...textStyle, width: '100%', minHeight: '100px', border: '1px solid #ccc', padding: '10px' }}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={(e) => setSliderValue(e.target.value)}
        style={{ width: '100%' }}
      />
      <div style={{ marginTop: '20px' }}>{text}</div>
    </div>
  );
}

export default VisionSimulator;
