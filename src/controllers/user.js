const usersService = require('../services/usersService');
const loginService = require('../services/loginService');
const { tokenError } = require('../services/erros');
const errorTokenMiddleware = require('../middlewares/errorTokenMiddleware');

const usersController = {
  /** @type {import('express').RequestHandler} */
  async getId(req, res) {
    const token = req.headers.authorization;
    if (!token) tokenError('Token not found');
    await errorTokenMiddleware.verifyToken(token);
    const { id } = req.params;
    const user = await usersService.getId(id);
    res.status(200).json(user);
  },

  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    await usersService.validarBody(req.body);
    const { displayName, email, password, image } = req.body;
    await usersService.getEmail(email);
    const user = await usersService.add({ displayName, email, password, image });
    const token = await loginService.makeToken(user);
    res.status(201).json({ token });
  },

  /** @type {import('express').RequestHandler} */
  async get(req, res) {
    const token = req.headers.authorization;
    if (!token) tokenError('Token not found');
    await errorTokenMiddleware.verifyToken(token);
    const user = await usersService.getAll();
    res.status(200).json(user);
  },
};

module.exports = usersController;