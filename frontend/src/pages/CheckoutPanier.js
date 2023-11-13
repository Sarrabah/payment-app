import React from "react";

const CheckoutPanier = () => {
    const storedBasket = localStorage.getItem('basket');
    let selectedProducts = storedBasket ? JSON.parse(storedBasket) : [];
    const totalPrice = (products) => {
        let sum = 0;
        for (let p of products) {
            sum = sum + (p.priceUnit * p.quantity);
        }
        return sum;
    }
    const handleValidation = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/order', {
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
            window.alert('Votre commande est validée !!', 'Alerte');
            selectedProducts = [];
            localStorage.setItem('basket', JSON.stringify(selectedProducts));
            window.location.href = '/';
        } catch (error) {
            window.alert('Désolé! Votre commande n\'a pas pu être validée');
            console.error('Error validating order:', error);
        }
    }
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4"> Panier </h1>
            <h2 className="text-xl mb-2 underline underline-offset-2" >Produits sélectionnés: </h2> <br></br>
            <ul className="list-disc list-inside">
                {selectedProducts.map((product) => (
                    <li key={product.id} className="mb-2">
                        <span className="font-bold">{product.name}</span> -- Quantité: {product.quantity} -- Prix total par produit : {product.priceUnit * product.quantity} Euro
                    </li>
                ))}
            </ul>
            <div className="validation border-double border-4 border-green-600 p-4 mt-4 mx-auto max-w-md text-center">
                <h4 className="underline underline-offset-2"> Sous-total  </h4> {totalPrice(selectedProducts)} Euro
                <h4 className="underline underline-offset-2"> Livraison </h4> Gratuit
                <h3 className="underline underline-offset-2"> Total </h3> {totalPrice(selectedProducts)} Euro
                <hr></hr>
                <button onClick={handleValidation} className="bg-blue-500 text-white px-4 py-2 rounded mt-4"> Valider ma commande </button>
            </div>
        </div>
    );
}
export default CheckoutPanier;