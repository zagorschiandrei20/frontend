import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import LoginPage from "./components/LoginPage";
import CartPage from "./components/CartPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get("user");
  
    if (userParam) {
      const userData = JSON.parse(decodeURIComponent(userParam));
      console.log('User data:', userData); 
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      window.history.replaceState({}, document.title, "/");
    } else {
      const authState = localStorage.getItem("isAuthenticated") === "true";
      const savedUser = localStorage.getItem("user");
  
      console.log('User from localStorage:', savedUser); 
      setIsAuthenticated(authState);
      setUser(savedUser ? JSON.parse(savedUser) : null);
    }
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get("user");
  
    if (userParam) {
      const userData = JSON.parse(decodeURIComponent(userParam));
  
      console.log('User data:', userData);
  
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userData));
  
      setIsAuthenticated(true);
      setUser(userData);
  
      window.history.replaceState({}, document.title, "/");
    } else {
      const authState = localStorage.getItem("isAuthenticated") === "true";
      const savedUser = localStorage.getItem("user");
  
      console.log('User from localStorage:', savedUser);
  
      setIsAuthenticated(authState);
      setUser(savedUser ? JSON.parse(savedUser) : null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);

    window.location.href = "http://localhost:5000/auth/logout";
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              user?.isAdmin ? (
                <Navigate to="/products" />
              ) : (
                <Navigate to="/cart" />
              )
            ) : (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />

        <Route
          path="/products"
          element={
            isAuthenticated && user?.isAdmin ? (
              <div>
                <h1>Welcome, {user.displayName} (Admin)</h1>
                <button onClick={handleLogout}>Logout</button>
                <ProductList />
                <AddProduct />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/cart"
          element={
            isAuthenticated ? (
              <div>
                <h1>Welcome to Your Cart, {user ? user.displayName : 'Guest'}!</h1>
                <button onClick={handleLogout}>Logout</button>
                <CartPage user={user} />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
  
}

export default App;