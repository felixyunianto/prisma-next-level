const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post('/sign-up', authController.signUp);
authRouter.post('/sign-in', authController.signIn);

module.exports = authRouter;