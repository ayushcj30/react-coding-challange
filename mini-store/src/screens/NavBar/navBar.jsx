import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
import { ThemeContext } from "../../ThemeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode, cart } = useContext(ThemeContext);
  const totalCartValue = cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <h2>Mini Store</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart (₹{totalCartValue})</Link>
        <Link to="/profile" >{"Profile"}</Link>
        <button onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
      </div>
    </nav>
  );
};

export default Navbar;
