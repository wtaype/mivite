import React from 'react';

const ControlPanel = ({ settings, onSettingsChange }) => {
  const handleInputChange = (e) => {
    const { id, value, type } = e.target;
    const newValue = type === 'number' ? parseInt(value, 10) : value;
    
    onSettingsChange({ [id.replace('bd', 'border')]: newValue });
  };

  return (
    <div className="mibox dfd">
      <div className="box box1 dfd">
        <label htmlFor="bdw">
          Border Width: 
          <input 
            type="text" 
            id="bdw" 
            value={settings.borderWidth} 
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="bdr">
          Border Radius: 
          <input 
            type="text" 
            id="bdr" 
            value={settings.borderRadius} 
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="bdc">
          Border Color: 
          <input 
            type="color" 
            id="bdc" 
            value={settings.borderColor} 
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="box box2"></div>
      <div className="box box3"></div>
      <div className="box box4"></div>
    </div>
  );
};

export default ControlPanel;