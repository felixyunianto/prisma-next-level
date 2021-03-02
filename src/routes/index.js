const mainRouters = require('express').Router();

const productRouters = require('./productRouters');
const authRouter = require('./authRouters');

mainRouters.get('/', (req, res) => {
    res.send({
        msg : "Success",
        author: "Felix Yunianto Gunawan"
    });
})

mainRouters.use('/auth',authRouter)
mainRouters.use('/product',productRouters)

module.exports = mainRouters;