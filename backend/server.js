const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your API routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});