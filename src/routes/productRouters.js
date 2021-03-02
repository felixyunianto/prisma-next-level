const productRouters = require('express').Router();
const productControllers = require('../controllers/productControllers');
const uploadSingle = require('../helpers/upload');

productRouters.get('/', productControllers.getProducts);
productRouters.post('/', uploadSingle, productControllers.postProduct);
productRouters.put('/:id', productControllers.putProducts);
productRouters.delete('/:id', productControllers.deleteProduct);

module.exports = productRouters;