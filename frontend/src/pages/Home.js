import React, { useEffect, useState } from "react";
import ProductListings from "../components/ProductListings";
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [catalogProduct, setCatalogProduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then(response => response.json())
            .then(data => setCatalogProduct(data.catalog))
            .catch(error => console.error("Error in fetching products", error));

        const storedBasket = localStorage.getItem("basket");
        const products = storedBasket ? JSON.parse(storedBasket) : [];
        setSelectedProducts(products);
    }, []);
    // fct pour ajouter le produit à la liste 
    const addProduct = (newProduct) => {
        const existingProductIndex = selectedProducts.findIndex(product => product.id === newProduct.id);
        let updatedProducts = [...selectedProducts];
        if (existingProductIndex !== -1) {
            updatedProducts[existingProductIndex].quantity = newProduct.quantity;
        } else {
            updatedProducts = [...selectedProducts, newProduct];
        }
        setSelectedProducts(updatedProducts);
        localStorage.setItem('basket', JSON.stringify(updatedProducts));
    };

    const sum = (products) => {
        let total = 0;
        for (let p of products) {
            total = total + p.quantity;
        }
        return total;
    }
    return (
        <div className='flex flex-col items-center text-center'>
            <div className="panier text-right bg-gray-200 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-0">My Payment App</h2>
                    <div>
                        <p className="mb-2">La somme des produits: {sum(selectedProducts)} </p>
                        <Link to="/checkout" className="text-blue-500">Consulter mon Panier</Link>
                    </div>
                </div>
            </div>
            <h1 className="text-3xl font-bold mt-4 mb-2"> Liste des produits </h1>
            <ProductListings products={catalogProduct} addProduct={addProduct} />
        </div>
    );
};

export default Home;
