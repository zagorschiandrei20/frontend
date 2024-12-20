import React from "react";

const LoginPage = ({ setIsAuthenticated }) => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Online Store</h1>
      <p>Please log in to access the store</p>
      <button onClick={handleGoogleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;