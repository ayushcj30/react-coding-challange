import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/Home/home";
import Cart from "./screens/Cart/cart";
import './App.css'
import ThemeProvider from "./ThemeContext";
import Navbar from "./screens/NavBar/navBar";
import CheckoutPage from "./screens/Checkout/checkoutForm";
import ProfilePage from "./screens/Profile/profile";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
