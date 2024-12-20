import React, { useState } from 'react';
import { addProduct } from '../api/api';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    addProduct({ name, price })
      .then((response) => {
        console.log('Product added:', response.data);
        alert('Product added successfully!');
        setName('');
        setPrice('');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;