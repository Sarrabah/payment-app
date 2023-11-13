# Application de Paiement

## Table of Contents

- [Description du projet](#description)
- [Fonctionalités](#fct)  
- [Instructions d'Installation et d'Exécution](#instructions)
   - [Prérequis](#prérequis)
   - [Cloner le projet](#cloner)
   - [Frontend (React)](#frontend)
   - [Backend (Node.js avec Express)](#backend)
   - [Base de Données (MySQL)](#bdd)
- [Explication](#exp)
   - [Modèle de données](#modéle)
   - [Endpoints](#endpoint)
   - [Gestion de la condition de course avec Transactions et Verrouillage](#gestion)

## Description du Projet

Ce projet est une petite application de paiement avec une interface utilisateur développée en React pour le frontend, une API en Node.js avec Express pour le backend, et une base de données MySQL.

## Fonctionnalités

* Les utilisateurs peuvent ajouter des produits à leur panier tout en respectant la limite de stock disponible.

* Une fois les produits ajoutés, les utilisateurs peuvent se diriger vers une autre page pour finaliser leur commande.

* Après avoir passé une commande, la commande est sauvgarder dans la base de données, comprenant le prix total et chaque article de la commande. Le stock de produits est également mis à jour (La condition de course est gérée).

## Instructions d'Installation et d'Exécution

### 1.Prérequis

- Node.js installé sur votre machine. [Télécharger Node.js](https://nodejs.org/)
- MySQL installé sur votre machine. [Télécharger MySQL](https://dev.mysql.com/downloads/)
### 2. Cloner le Projet

```bash
git clone git@github.com:Sarrabah/payment-app.git
cd payment-app
```
## 3. Frontend (React)

1. Naviguez vers le répertoire `frontend` :

    ```bash
    cd frontend
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

3. Démarrez l'application :

    ```bash
    npm start
    ```

L'application frontend sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## 4. Backend (Node.js avec Express)

1. Naviguez vers le répertoire `backend` :

    ```bash
    cd backend
    ```

2. Créez un fichier `.env` avec les configurations nécessaires (par exemple, `DB_PASSWORD`, `DB_DATABASE`, `DB_HOST`, `DB_USER`), basé sur l'exemple fourni.

    ```env
    DB_PASSWORD=VotreMotDePasse
    DB_DATABASE=paymentappdb
    DB_HOST=localhost
    DB_USER=root
    ```

    Remplacez les valeurs par celles appropriées à votre environnement.

3. Installez les dépendances :

    ```bash
    npm install
    ```

4. Démarrez le serveur :

    ```bash
    npm start
    ```

Le serveur backend sera accessible à l'adresse [http://localhost:3001](http://localhost:3001).

## 5. Base de Données (MySQL)

1. Exécutez les scripts SQL fournis dans le répertoire `Scriptssql` pour créer les tables nécessaires.

Assurez-vous que votre serveur MySQL est en cours d'exécution.

Avec ces étapes, vous devriez être en mesure d'exécuter l'application de paiement localement. N'oubliez pas d'adapter les configurations telles que les ports et les connexions à la base de données en fonction de vos besoins.

## Explication

### 1. Modèle de Données

Le modèle de données repose sur trois tables principales : "Products", "Orders", et "OrderDetails", qui sont interconnectées pour représenter les informations relatives aux produits, aux commandes, et aux détails de commande.

#### Table "Products"

- **Champs :**
  - `id` : Identifiant unique du produit (clé primaire).
  - `name` : Nom du produit.
  - `price` : Prix du produit.
  - `inventory` : Quantité en stock du produit (doit être supérieure ou égale à zéro).

- **Exemple d'entrées :**
  - T-shirt Blanc, Prix : 19.99, Stock : 100
  - Jean Slim Noir, Prix : 49.99, Stock : 75


#### Table "Orders"

- **Champs :**
  - `orderId` : Identifiant unique de la commande (clé primaire).
  - `totalPrice` : Prix total de la commande.

- **Exemple d'entrées :**
  - Commande 1, Prix total : 150.00
  - Commande 2, Prix total : 200.50

#### Table "OrderDetails"

- **Champs :**
  - `id` : Identifiant unique du détail de la commande (clé primaire).
  - `orderId` : Identifiant de la commande associée (clé étrangère référençant la table "Orders").
  - `productId` : Identifiant du produit commandé (clé étrangère référençant la table "Products").
  - `soldQuantity` : Quantité du produit vendue dans cette commande.

- **Exemple d'entrées :**
  - Détail 1, Commande 1, Produit 1, Quantité vendue : 3
  - Détail 2, Commande 1, Produit 2, Quantité vendue : 2
  - Détail 3, Commande 2, Produit 3, Quantité vendue : 1

#### Contraintes :

- La colonne `inventory` de la table "Products" doit être supérieure ou égale à zéro, assurant que la quantité en stock ne peut pas être négative.

- Les clés étrangères `orderId` dans la table "OrderDetails" et `productId` dans la table "OrderDetails" référencent respectivement les clés primaires de "Orders" et "Products", assurant l'intégrité référentielle entre les tables.

Ce modèle de données avec ses contraintes assure la cohérence des données et la qualité des relations entre les différentes entités.

### 2. Endpoints

#### a. GET /api/products

Cet endpoint permet de récupérer la liste complète des produits disponibles.

##### Requête
- Méthode: GET
- URL: `/api/products`

##### Réponse
La réponse sera au format JSON et ressemblera à ceci :

```json
{
    "catalog": [
        {
            "id": 1,
            "name": "T-shirt Blanc",
            "price": "19.99",
            "inventory": 74
        },
        {
            "id": 2,
            "name": "Jean Slim Noir",
            "price": "49.99",
            "inventory": 0
        },
        // ... autres produits
    ]
}
```
Chaque produit dans le catalogue contient un identifiant (id), un nom (name), un prix (price), et la quantité en stock (inventory).

#### b. POST /api/order 

##### Requête
- **Méthode:** POST
- **URL:** `/api/order`
- **Body:**
  
  ```json
  {
      "totalPriceCmd": 5500.00,
      "productDetails": [
          {
              "idProduct": 1,
              "quantity": 1
          },
          {
              "idProduct": 4,
              "quantity": 5 
          }
          // ... autres produits dans le panier
      ]
  }
  ```

Le corps de la requête doit contenir le prix total de la commande (totalPriceCmd) et les détails de chaque produit commandé, spécifiant l'identifiant du produit (idProduct) et la quantité commandée (quantity).


### 3. Gestion de la condition de course avec Transactions et Verrouillage

La gestion de la mise à jour du stock lors de la sauvegarde de la commande présente une complexité. Une fois que la commande et ses détails ont été sauvegardés dans les tables "order" et "order details", une mise à jour du stock est effectuée dans la table "product". Cependant, différents problèmes peuvent survenir :

- Il est possible que la requête échoue à mi-chemin. Afin d'éviter que la base de données se retrouve dans un état inconsistant, nous nous assurons que nos opérations sont atomiques, d'où l'introduction des transactions.

- Étant donné que plusieurs utilisateurs peuvent effectuer des commandes simultanément, afin d'éviter que deux utilisateurs essaient de modifier la même table en même temps, nous introduisons un mécanisme de verrouillage.

L'utilisation conjointe de transactions et de verrouillages renforce la fiabilité et la cohérence de l'application, minimisant les risques de conditions de course et de conflits.


#### Transaction 

Une transaction atomique assure que toutes les étapes de l'opération sont exécutées avec succès ou qu'aucune modification n'est apportée à la base de données en cas d'échec à n'importe quelle étape. Cela assure la cohérence des données, même en cas d'erreurs.
Dans le contexte de la sauvegarde d'une commande, la transaction engloberait les étapes suivantes :
1. Insertion de la commande dans la table "order".
2. Insertion des détails de la commande dans la table "order details".
3. Mise à jour du stock dans la table "product".

#### Verrouillage

En plus de l'utilisation de transactions, nous utilisons un mécanisme de verrouillage pour garantir qu'un seul utilisateur peut agir sur la transaction à la fois. Cela évite les conflits potentiels et assure une exécution séquentielle des opérations.
Le verrouillage garantit qu'une fois qu'un utilisateur commence la transaction, aucun autre utilisateur ne peut interférer jusqu'à ce que la transaction soit terminée (soit avec succès, soit en cas d'échec).