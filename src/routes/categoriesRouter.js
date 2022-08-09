const { Router } = require('express');
const categoriesController = require('../controllers/categories');

const categoriesRouter = Router();
categoriesRouter.post('/', categoriesController.add);
categoriesRouter.get('/', categoriesController.get);

module.exports = categoriesRouter;