import React from "react";
import './CheckoutPanier.css';

const CheckoutPanier = () => {
    const storedBasket = localStorage.getItem('basket');
    let selectedProducts = storedBasket ? JSON.parse(storedBasket) : [];
    const totalPrice = (products) =>{
        let sum = 0;
        for(let p of products){
            sum = sum +( p.priceUnit * p.quantity ) ;
        }
        return sum;
    }
    const handleValidation = async() => {
        try{
            const response = await fetch('http://localhost:3001/api/order',{
             method: 'POST',
             headers: {
                'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                totalPriceCmd: totalPrice(selectedProducts),
                productDetails: selectedProducts.map(product => ({
                    idProduct: product.id,
                    quantity: product.quantity,
                })),
             }),   
            });
            if (!response.ok) {
                throw new Error('Order not validate');
            }
        window.alert('Votre commande est validée !!','Alerte');
        selectedProducts = [] ;
        localStorage.setItem('basket',JSON.stringify(selectedProducts));
        window.location.href = '/';
        } catch(error){
            console.error('Error validating order:', error);
        }
    }
    return (
        <div>
            <h1 className="title"> Panier </h1>
            <h2>Produits sélectionnés: </h2>
            <ul>
                {selectedProducts.map((product) => {
                    return (
                        <li key={product.id}>
                            Nom du produit : {product.name}   --   Quantité: {product.quantity}   --   Prix total par produit : {product.priceUnit*product.quantity} Euro
                        </li>
                    )
                })}
            </ul>
            <div className="validation">
            <h4> Sous-total  </h4> {totalPrice(selectedProducts)} Euro
            <h4> Livraison </h4> Gratuit
            <h3> Total </h3> {totalPrice(selectedProducts)} Euro
            <br></br>
            <hr></hr>
            <button onClick={handleValidation}> Valider ma commande </button>
            </div>
        </div>
    );
}
export default CheckoutPanier;