const productRouters = require('express').Router();
const productControllers = require('../controllers/productControllers');
const uploadSingle = require('../helpers/upload');
const authMiddleware = require('../helpers/authMiddlewares');

productRouters.get('/', productControllers.getProducts);
productRouters.post('/', authMiddleware.checkLogin, uploadSingle, productControllers.postProduct);
productRouters.put('/:id', productControllers.putProducts);
productRouters.delete('/:id', productControllers.deleteProduct);

module.exports = productRouters;