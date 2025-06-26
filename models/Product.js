let products = [];
let currentId = 1;

const getAllProducts = () => products;

const getProductById = (id) => products.find(product => product.id === id);

const createProduct = (productData) => {
    const newProduct = { id: currentId++, ...productData };
    products.push(newProduct);
    return newProduct;
};

const updateProduct = (id, productData) => {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        return products[index];
    }
    return null;
};

const deleteProduct = (id) => {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        return products.splice(index, 1)[0];
    }
    return null;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};