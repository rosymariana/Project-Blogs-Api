const { Router } = require('express');
const userController = require('../controllers/user');

const userRoute = Router();
userRoute.get('/:id', userController.getId);
userRoute.get('/', userController.get);
userRoute.post('/', userController.add);

module.exports = userRoute;