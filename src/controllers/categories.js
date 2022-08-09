const categoriesService = require('../services/categoriesService');
const { tokenError } = require('../services/erros');
const errorTokenMiddleware = require('../middlewares/errorTokenMiddleware');

const categoriesController = {
  
  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    const token = req.headers.authorization;
    if (!token) tokenError('Token not found');
    await errorTokenMiddleware.verifyToken(token);
    await categoriesService.validarBody(req.body);
    const { name } = req.body;
    const categories = await categoriesService.add({ name });
    res.status(201).json(categories);
  },

  /** @type {import('express').RequestHandler} */
  async get(req, res) {
    const token = req.headers.authorization;
    if (!token) tokenError('Token not found');
    await errorTokenMiddleware.verifyToken(token);
    const categories = await categoriesService.get();
    res.status(200).json(categories);
  },
};

module.exports = categoriesController;