const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const validateProduct = require('./middleware/validateProduct');
const errorHandler = require('./middleware/errorHandler');
const { NotFoundError } = require('./errors/customErrors');
const { ValidationError } = require('../errors/customErrors');



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/products', productRoutes);
app.use(logger);
app.use(auth);

// Use validation middleware for POST and PUT requests
app.post('/api/products', validateProduct, productRoutes);
app.put('/api/products/:id', validateProduct, productRoutes);
app.use('/api/products', productRoutes);

// Global Error Handling Middleware
app.use((req, res, next) => {
    next(new NotFoundError()); 
});

app.use(errorHandler);

//post route with error handling
router.post('/products', async (req, res, next) => {
    try {
        // Logic to create a new product
        // If validation fails, throw a ValidationError
        if (!req.body.name) {
            throw new ValidationError('Product name is required');
        }

        // Simulate product creation
        const newProduct = { id: 1, ...req.body }; // Mock product creation
        res.status(201).json(newProduct);
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

module.exports = router;


// Connect to MongoDB
const mongouri = 'mongodb://localhost:27017/Productdb';
mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Hello, World');
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });