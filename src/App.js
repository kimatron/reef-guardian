import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFish, FaTrash, FaInfoCircle } from 'react-icons/fa';
import './App.css';

const coralTypes = [
  { name: 'Staghorn Coral', icon: '🌿', color: '#ff00ff' },
  { name: 'Brain Coral', icon: '🧠', color: '#00ffff' },
  { name: 'Sea Fan', icon: '🌴', color: '#ff8800' },
  { name: 'Mushroom Coral', icon: '🍄', color: '#00ff00' },
];

const App = () => {
  const [selectedCoral, setSelectedCoral] = useState(null);
  const [reef, setReef] = useState([]);
  const [infoPanel, setInfoPanel] = useState(null);

  const addCoralToReef = (e) => {
    if (selectedCoral) {
      const newCoral = {
        ...selectedCoral,
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
      setReef([...reef, newCoral]);
    }
  };

  const showInfo = (coral) => {
    setInfoPanel(coral);
  };

  return (
    <div className="app">
      <h1 className="neon-text">Neon Reef Guardian</h1>
      <div className="toolbar">
        {coralTypes.map((coral) => (
          <motion.button
            key={coral.name}
            className={`coral-btn ${selectedCoral === coral ? 'selected' : ''}`}
            style={{ backgroundColor: coral.color }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedCoral(coral)}
          >
            {coral.icon} {coral.name}
          </motion.button>
        ))}
      </div>
      <div className="reef-container" onClick={addCoralToReef}>
        {reef.map((coral, index) => (
          <motion.div
            key={index}
            className="coral"
            style={{ left: coral.x, top: coral.y, color: coral.color }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => showInfo(coral)}
          >
            {coral.icon}
          </motion.div>
        ))}
        <motion.div
          className="fish"
          animate={{
            x: [0, 300, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <FaFish />
        </motion.div>
      </div>
      <div className="info-panel">
        <h2 className="neon-text">Reef Info <FaInfoCircle /></h2>
        {infoPanel ? (
          <div>
            <h3>{infoPanel.name}</h3>
            <p>Learn about {infoPanel.name} and its importance to the reef ecosystem.</p>
          </div>
        ) : (
          <p>Click on a coral to learn more about it!</p>
        )}
      </div>
      <div className="conservation-tip">
        <h3 className="neon-text">Punk Conservation Tip <FaTrash /></h3>
        <p>Join a local beach cleanup to keep our oceans trash-free!</p>
      </div>
    </div>
  );
};

export default App;