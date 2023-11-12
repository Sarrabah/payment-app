import React, { useEffect, useState } from "react";
import './ProductCard.css';

const ProductCard = ({ product, addProduct }) => {
    const [count, setCount] = useState(0);
    const [isSoldOut, setIsSoldOut] = useState(false);

    useEffect(() => {
        const storedBasket = localStorage.getItem("basket");
        const basket = storedBasket ? JSON.parse(storedBasket) : [];
        let i = 0;
        let stop = false;
        while ((i < basket.length) && (stop == false)) {
            if (basket[i].id === product.id) {
                setCount(basket[i].quantity);
                stop = true;
            }
            i++;
        }
    }, [])

    useEffect(() => {
        if (count < product.inventory) {
            setIsSoldOut(false);
        }
        else {
            setIsSoldOut(true);
        }
    }, [count, product.inventory]);

    const addClick = () => {
        if (count < product.inventory) {
            setCount(count + 1);
        }
    };
    const removeClick = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    const addToBasket = () => {
        const productToAdd = {
            id: product.id,
            name: product.name,
            priceUnit: product.price,
            quantity: count
        }
        addProduct(productToAdd);
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
            {isSoldOut && <p> Il ne reste plus de produit en stock </p>}
        </div>
    );
};
export default ProductCard;
