// CheckoutPage.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext";
import "./checkoutForm.css";

const CheckoutPage = () => {
  const { cart, setCart, darkMode } = useContext(ThemeContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || form;
    setForm(savedProfile);
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders)
  }, []);
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!form.address.trim()) errors.address = "Address is required";
    if (!/^\d{10}$/.test(form.phone)) errors.phone = "Invalid phone number";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = () => {
    if (!validateForm()) return;
    const updatedOrders = [...orders, cart];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    localStorage.removeItem("cart");
    setCart([]);
    alert("Order Placed Successfully !")
    navigate("/");
  };

  return (
    <div className={`checkout-container ${darkMode ? "dark-mode" : ""}`}>
      <h1>Checkout</h1>
      <form className="checkout-form">
        <input
          className={`${darkMode ? "input-dark-mode" : ""}`}
          type="text"
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          className={`${darkMode ? "input-dark-mode" : ""}`}
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleInputChange}
        />
        <input
          className={`${darkMode ? "input-dark-mode" : ""}`}
          type="text"
          name="phone"
          value={form.phone}
          placeholder="Phone Number"
          onChange={handleInputChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <textarea
          className={`${darkMode ? "input-dark-mode" : ""}`}
          name="address"
          value={form.address}
          placeholder="Enter Address"
          onChange={handleInputChange}
        ></textarea>
        {errors.address && <p className="error">{errors.address}</p>}
        <button type="button" onClick={handleCheckout}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
