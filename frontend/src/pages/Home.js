import React, { useEffect, useState } from "react";
import ProductListings from "../components/ProductListings";
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [catalogProduct, setCatalogProduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/products')
        .then(response => response.json() )
        .then(data => setCatalogProduct(data.catalog))
        .catch(error => console.error("Error in fetching products",error));
        
        const storedBasket = localStorage.getItem("basket");
        const products = storedBasket ? JSON.parse(storedBasket) : [];
        setSelectedProducts(products);
    }, []);
    // fct pour ajouter le produit à la liste 
    const addProduct = (newProduct) => {
        let i = 0;
        if (selectedProducts.length !== 0) {
            while (i < selectedProducts.length - 1 && selectedProducts[i].id !== newProduct.id) {
                i++;
            }
            if (selectedProducts[i].id === newProduct.id) {
                selectedProducts[i].quantity = newProduct.quantity;
                const update = [...selectedProducts];
                setSelectedProducts(update);
                localStorage.setItem('basket', JSON.stringify(update));
            }
            else {
                const updatedSelectedProduct = [...selectedProducts, newProduct];
                setSelectedProducts(updatedSelectedProduct);
                localStorage.setItem('basket', JSON.stringify(updatedSelectedProduct));
            }
        }
        else {
            const updatedSelectedProduct = [...selectedProducts, newProduct];
            setSelectedProducts(updatedSelectedProduct);
            localStorage.setItem('basket', JSON.stringify(updatedSelectedProduct));
        }
    }

    const sum = (products) => {
        let total = 0;
        for (let p of products) {
            total = total + p.quantity;
        }
        return total;
    }
    return (
        <div className='Home'>
            <div className="panier">
                <p> la somme des produits: {sum(selectedProducts)} </p>
                <Link to="/checkout"> Consulter mon Panier </Link>
            </div>
            <h1> Liste des produits </h1>
            <ProductListings products={catalogProduct} addProduct={addProduct} />
        </div>
    );
};

export default Home;
