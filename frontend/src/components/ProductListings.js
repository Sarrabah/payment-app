import React from 'react';
import './ProductListings.css';

const ProductListings = ({ products }) => {

  return (
    <div className="product-listings">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>Prix: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductListings;
