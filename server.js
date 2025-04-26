const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let products = [];
let nextId = 1;

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET a single product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// POST a new product
app.post('/products', (req, res) => {
  const { name, description, price } = req.body;
  if (name && description && typeof price === 'number') {
    const newProduct = { id: nextId++, name, description, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } else {
    res.status(400).send('Please provide name, description, and price.');
  }
});

// PUT (update) an existing product
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price } = req.body;
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { id, name, description, price };
    res.json(products[index]);
  } else {
    res.status(404).send('Product not found');
  }
});

// DELETE a product
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);
  if (products.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});