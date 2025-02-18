import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem("darkMode", JSON.stringify(!prevMode));
      return !prevMode;
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, cart, setCart }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
