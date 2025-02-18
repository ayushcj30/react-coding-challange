import React, { useContext } from "react";
import "./cart.css";
import { ThemeContext } from "../../ThemeContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart, darkMode } = useContext(ThemeContext);
  const navigate = useNavigate()

  const totalCartValue = cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  return (
    <div className={`cart-container ${darkMode ? "dark-mode" : ""}`}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
        <div >
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <div>
                <p className="price" >₹{product.price}</p>
                <button onClick={() => handleRemoveItem(product.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h2>Total: ₹{totalCartValue}</h2>
        </div>
        <button onClick={() => {navigate('/checkout')}}>Checkout</button>

        </>
      )}
    </div>
  );
};

export default Cart;
