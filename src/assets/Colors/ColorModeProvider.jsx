import React, { useState, useEffect } from 'react';

const ColorModeContext = React.createContext();

const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState(() => {
    const storedColorMode = localStorage.getItem('colorMode');
    return storedColorMode || 'light'; // Default to 'light' if no mode is stored
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedColorMode = localStorage.getItem('colorMode');
      setColorMode(storedColorMode || 'light'); // Update colorMode based on storage
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light';
    localStorage.setItem('colorMode', newColorMode); // Update localStorage
    setColorMode(newColorMode); // Update state
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

const useColorMode = () => {
  const context = React.useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};

export { ColorModeProvider, useColorMode };
