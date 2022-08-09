const postService = require('../services/postService');
const { tokenError, throwNotFoundError } = require('../services/erros');
const errorTokenMiddleware = require('../middlewares/errorTokenMiddleware');
const categoriesService = require('../services/categoriesService');

const postController = {
  
  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    const token = req.headers.authorization;
    if (!token) tokenError('Token not found');
    const { id } = await errorTokenMiddleware.verifyToken(token);  
    console.log('id', id);  
    await postService.validarBody(req.body);
    const teste = await Promise.all(req.body.categoryIds
        .map((category) => categoriesService.getId(category)));
        console.log(teste);
    if (teste.includes(null)) throwNotFoundError('"categoryIds" not found');
    const post = await postService.add(req.body, id);
    await Promise.all(req.body.categoryIds)
    .map((categoryId) => postService.add(post.id, categoryId));
    res.status(201).json(post);
  },

  /** @type {import('express').RequestHandler} */
  async get(req, res) {
    const token = req.headers.authorization;
    if (!token) tokenError('Token not found');
    await errorTokenMiddleware.verifyToken(token);
    const post = await postService.get();
    res.status(200).json(post);
  },

  async getId(req, res) {
    const token = req.headers.authorization;
    if (!token) tokenError('Token not found');
    await errorTokenMiddleware.verifyToken(token);
    const { id } = req.params;
    const post = await postService.getId(id);
    if (!post) throwNotFoundError('Post does not exist');
    res.status(200).json(post);
  },
};

module.exports = postController;