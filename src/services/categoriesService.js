const Joi = require('joi');
const models = require('../database/models');
require('dotenv').config();

const categoriesService = {
  async validarBody(body) {
      const schema = Joi.object({
        name: Joi.string().required().max(255),
      });
      const result = await schema.validateAsync(body);
      return result;
    },
    async add({ name }) {
        const categories = await models.Category
        .create({ name }, { raw: true });
        return categories;
      },
    
        async get() {
        const categoriesModel = await models.Category.findAll();
        return categoriesModel;
      },
};

module.exports = categoriesService;