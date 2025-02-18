import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { ThemeContext } from "../../ThemeContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState({});
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || {
      name: "",
      email: "",
      phone: "",
    };
    setProfile(savedProfile);

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const validateProfile = () => {
    let errors = {};
    if (!profile.name.trim()) errors.name = "Name is required";
    if (!profile.email.trim() || !/^\S+@\S+\.\S+$/.test(profile.email))
      errors.email = "Invalid email";
    if (!/^\d{10}$/.test(profile.phone)) errors.phone = "Invalid phone number";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProfile = () => {
    if (!validateProfile()) return;
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  return (
    <div className={`profile-container ${darkMode ? "dark-mode" : ""}`}>
      <h1>Profile</h1>
      <div className="profile-form">
        <input
          className={`${darkMode ? "input-dark-mode" : ""}`}
          type="text"
          name="name"
          value={profile.name}
          placeholder="Enter Name"
          onChange={handleInputChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          className={`${darkMode ? "input-dark-mode" : ""}`}
          type="email"
          name="email"
          value={profile.email}
          placeholder="Enter Email"
          onChange={handleInputChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          className={`${darkMode ? "input-dark-mode" : ""}`}
          type="text"
          name="phone"
          value={profile.phone}
          placeholder="Phone Number"
          onChange={handleInputChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <button onClick={handleSaveProfile}>Save Profile</button>
      </div>

      <h2>Previous Orders</h2>
      {orders.length === 0 ? (
        <p>No previous orders found.</p>
      ) : (
        <ul className="order-list">
          {orders?.map((order, index) => (
            <li key={index} className="order-item">
              <strong>Order {index + 1}</strong>
              <p>Items: {order?.map((item) => item.title).join(", ")}</p>
              <p>
                Total: ₹{order?.reduce((sum, item) => sum + item.price, 0)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate("/")}>Go to Cart</button>
    </div>
  );
};

export default ProfilePage;
