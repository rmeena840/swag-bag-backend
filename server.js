const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const products = require('./routes/api/products');

const app = express();

// BodyParser Middleware

app.use(bodyparser.json());
app.use(cors());

// Routes

app.use('/api/',products);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at ${port}`));

