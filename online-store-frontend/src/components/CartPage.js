import React, { useEffect, useState } from "react";
import { fetchProducts, fetchCartItems, addToCart, deleteCartItem } from "../api/api";

const CartPage = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    fetchCartItems(user.googleId)
      .then((response) => setCartItems(response.data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, [user.googleId]);

  const handleAddToCart = (productId) => {
    addToCart(user.googleId, productId)
      .then(() => {
        return fetchCartItems(user.googleId);
      })
      .then((response) => setCartItems(response.data))
      .catch((error) => console.error("Error adding item to cart:", error));
  };

  const handleDeleteCartItem = (cartItemId) => {
    deleteCartItem(cartItemId)
      .then(() => {
        return fetchCartItems(user.googleId);
      })
      .then((response) => setCartItems(response.data))
      .catch((error) => console.error("Error deleting cart item:", error));
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {/* Cart Items */}
      <h3>Cart Items</h3>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.Product.name} - ${item.Product.price}
              <button onClick={() => handleDeleteCartItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in your cart.</p>
      )}

      {/* Product List */}
      <h3>Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;