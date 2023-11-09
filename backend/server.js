const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});