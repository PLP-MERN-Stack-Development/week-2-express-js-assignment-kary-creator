const express = require('express');
const router = express.Router();
const productModel = require('../models/product');
const asyncHandler = require('../middleware/asyncHandler');


// Sample product data (replace with your database logic)
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics' },
    { id: 2, name: 'Smartphone', category: 'Electronics' },
    { id: 3, name: 'coffeMaker', category: 'kitchen' },
    ];

    // GET all products with optional category filtering
router.get('/products', asyncHandler(async (req, res) => {
    const { category } = req.query; 
    let filteredProducts = products;

    if (category) {
        filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    res.json(filteredProducts);
}));

module.exports = router;


// GET all products with optional category filtering and pagination
router.get('/products', asyncHandler(async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query; 
    let filteredProducts = products;

    if (category) {
        filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
        total: filteredProducts.length,
        page: parseInt(page),
        limit: parseInt(limit),
        products: paginatedProducts,
    });
}));


// GET products by name search
router.get('/search', asyncHandler(async (req, res) => {
    const { name } = req.query; // Get name from query parameters
    if (!name) {
        return res.status(400).json({ message: 'Name query parameter is required' });
    }

    const searchedProducts = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));

    res.json(searchedProducts);
}));


// GET product statistics by category
router.get('/statistics', asyncHandler(async (req, res) => {
    const statistics = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    res.json(statistics);
}));

// Get Api Products
router.get('/', (req, res) => {
    const products = productModel.getAllProducts();
    res.json(products);
    });


// GET /api/products/:id - Get a specific product
    router.get('/:id', (req, res) => {
    const product = productModel.getProductById(parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// POST /api/products - Create a new product
router.post('/', (req, res) => {
    const newProduct = productModel.createProduct(req.body);
    res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
router.put('/:id', (req, res) => {
    const updatedProduct = productModel.updateProduct(parseInt(req.params.id), req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).send('Product not found');
    }
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', (req, res) => {
    const deletedProduct = productModel.deleteProduct(parseInt(req.params.id));
    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).send('Product not found');
    }
});
module.exports = router;

