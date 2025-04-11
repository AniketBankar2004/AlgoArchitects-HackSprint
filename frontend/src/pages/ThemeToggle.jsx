import React, { useEffect, useState } from 'react';
import '../styling/ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="theme-toggle">
      <button onClick={toggleTheme}>
         {theme === 'light' ? '☀️' : '🌙'} 
      </button>
    </div>
  );
};

export default ThemeToggle;
