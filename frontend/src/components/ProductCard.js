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
        <div className="product-card bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-700">Prix: {product.price} Euro </p>
            <div className="items-center mt-2">
                <button onClick={removeClick} className="bg-gray-200 px-3 py-1 rounded"> - </button>
                <p className="mx-2">{count}</p>
                <button onClick={addClick} className="bg-gray-200 px-3 py-1 rounded"> + </button>
            </div>
            <button onClick={addToBasket} className={`mt-2 bg-blue-500 text-white px-4 py-2 rounded ${isSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}>Ajouter au panier </button>
            {isSoldOut && <p className="text-red-500"> Il ne reste plus de produit en stock </p>}
        </div>
    );
};
export default ProductCard;
