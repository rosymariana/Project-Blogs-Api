const { Router } = require('express');
const postController = require('../controllers/post');

const postRouter = Router();
postRouter.get('/:id', postController.getId);
postRouter.put('/:id', postController.getId);
postRouter.get('/', postController.get);
postRouter.post('/', postController.add);

module.exports = postRouter;