import React, { useState } from "react";
import './ProductCard.css';

const ProductCard = ({ product, addProduct}) => {
    const [count, setCount] = useState(0);
    const addClick = () => {
        setCount(count + 1);
    };
    const removeClick = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    const addToBasket = () => {
        const productToAdd ={
            id : product.id,
            name :product.name,
            priceUnit: product.price,
            quantity:count
        }
        addProduct(productToAdd);
        setCount(0);
    }
    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <p>Prix: ${product.price}</p>
            <p>
                <button onClick={removeClick}> - </button>
                <p>{count}</p>
                <button onClick={addClick}> + </button><br></br>
            </p>
            <button onClick={addToBasket}>Ajouter au panier </button>
        </div>
    );

};
export default ProductCard;
