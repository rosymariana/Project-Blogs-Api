const Joi = require('joi');
const { throwNotFoundError } = require('./erros');
const models = require('../database/models');
require('dotenv').config();

const postService = {
  async validarBody(body) {
      const schema = Joi.object({
        title: Joi.string().required().max(255),
        content: Joi.string().required().max(255),
    }).messages({
        'string.empty': 'Some required fields are missing',
        'any.required': 'Some required fields are missing',
      });
      const result = await schema.validateAsync(body);
      return result;
    },
    async add(id, { body }) {
        const { title, content } = body;
        const published = new Date();
        const updated = new Date();
        const user = await models.BlogPost
        .create({ title, content, userId: id, published, updated }, { raw: true });
        return user;
      },

      async get() {
        const postModel = await models.BlogPost.findAll({
            attributes: { exclude: ['userId'] },
            include: [{
                model: models.User,
                as: 'user',
                attributes: { exclude: ['password'] },
            },
                {
                    model: models.Category,
                    as: 'categories',
                    through: { attributes: { exclude: ['postId', 'categoryId'] } },
            }],
        });
        return postModel;
      },

      async getId(id) {
        const postModel = await models.BlogPost.findOne({
          where: { id },
          attributes: { exclude: ['UserId'] },
            include: [{
                model: models.User,
                as: 'user',
                attributes: { exclude: ['password'] },
            },
                {
                    model: models.Category,
                    as: 'categories',
                    through: { attributes: { exclude: ['postId', 'categoryId'] } },
            }],
        });
        console.log(postModel);
        if (!postModel) return throwNotFoundError('Post does not exist');
        return postModel;
      },
};

module.exports = postService;