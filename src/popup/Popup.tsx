import React, { useState } from 'react';
import './Popup.css';

type SpeedType = 'slow' | 'medium' | 'fast' | 'unlimited';

const Popup: React.FC = () => {
  const [status, setStatus] = useState<string>('');

  const handleSpeedChange = async (speed: SpeedType) => {
    setStatus('Applying settings...');
    try {
      const response = await chrome.runtime.sendMessage({ action: 'setSpeed', speed });
      if (response.success) {
        setStatus(`Speed set to ${speed}`);
      } else {
        setStatus(`Error: ${response.error}`);
      }
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="popup">
      <h2>Speed Control</h2>
      <button onClick={() => handleSpeedChange('slow')}>Slow (200kb/s)</button>
      <button onClick={() => handleSpeedChange('medium')}>Medium (1MB/s)</button>
      <button onClick={() => handleSpeedChange('fast')}>Fast (5MB/s)</button>
      <button onClick={() => handleSpeedChange('unlimited')}>No Limit</button>
      <div className="status">{status}</div>
    </div>
  );
};

export default Popup;

