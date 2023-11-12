# Application de Paiement

## Description du Projet

Ce projet est une petite application de paiement avec une interface utilisateur développée en React pour le frontend, une API en Node.js avec Express pour le backend, et une base de données MySQL.

## Fonctionnalités

* Les utilisateurs peuvent ajouter des produits à leur panier tout en respectant la limite de stock disponible.

* Une fois les produits ajoutés, les utilisateurs peuvent se diriger vers une autre page pour finaliser leur commande.

* Après avoir passé une commande, la commande est sauvgarder dans la base de données, comprenant le prix total et chaque article de la commande. Le stock de produits est également mis à jour (La condition de course est gérée).

## Prérequis

- Node.js installé sur votre machine. [Télécharger Node.js](https://nodejs.org/)
- MySQL installé sur votre machine. [Télécharger MySQL](https://dev.mysql.com/downloads/)

## Instructions d'Installation et d'Exécution

### 1. Cloner le Projet

```bash
git clone https://github.com/votre-utilisateur/votre-projet.git
cd votre-projet
```
## 2. Frontend (React)

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

## 3. Backend (Node.js avec Express)

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

## 4. Base de Données (MySQL)

1. Exécutez les scripts SQL fournis dans le répertoire `Scriptssql` pour créer les tables nécessaires.

Assurez-vous que votre serveur MySQL est en cours d'exécution.

Avec ces étapes, vous devriez être en mesure d'exécuter l'application de paiement localement. N'oubliez pas d'adapter les configurations telles que les ports et les connexions à la base de données en fonction de vos besoins.
