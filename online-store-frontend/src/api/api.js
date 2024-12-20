import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const fetchProducts = () => api.get('/products');

export const addProduct = (productData) => api.post('/products', productData);

export const startGoogleLogin = () => {
  window.location.href = 'http://localhost:5000/auth/google';
};

export const addToCart = (userId, productId) => {
  return api.post('/cart/add', { userId, productId }); 
};

export const fetchCartItems = (userId) => {
  return api.get(`/cart/${userId}`);
};

export const deleteCartItem = (cartItemId) => {
  return api.delete(`/cart/remove/${cartItemId}`);
};