import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { ThemeContext } from "../../ThemeContext";
import { PRODUCT_LIST_API_URL } from "../../api/apiUrl";

const HomePage = () => {
  const { darkMode, cart, setCart } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(PRODUCT_LIST_API_URL);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCartClick = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };

  const isProductInCart = (productId) => cart.some((item) => item.id === productId);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      <h1>Product Listing</h1>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className={`card ${darkMode ? "dark-mode" : ""} `}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <button
              className={isProductInCart(product.id) ? "added-to-cart" : ""}
              onClick={() => handleCartClick(product)}
              disabled={isProductInCart(product.id)}
            >
              {isProductInCart(product.id) ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
