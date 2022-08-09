const Joi = require('joi');
const { emailError } = require('./erros');
const { throwNotFoundError } = require('./erros');
const models = require('../database/models');
require('dotenv').config();

const usersService = {
  async validarBody(body) {
      const schema = Joi.object({
        displayName: Joi.string().required().min(8).max(255),
        email: Joi.string().required().email().max(255),
        password: Joi.string().required().min(6),
        image: Joi.string(),
      });
      const result = await schema.validateAsync(body);
      return result;
    },
    async add({ displayName, email, password, image }) {
        const user = await models.User
        .create({ displayName, email, password, image }, { raw: true });
        return user;
      },
    
    async getEmail(email) {
        const userEmail = await models.User.findOne({
        where: { email },
        });
        if (userEmail) emailError('User already registered');
    },

      async getAll() {
        const userModel = await models.User.findAll({
            raw: true,
          attributes: { exclude: ['password'] },
        });
        return userModel;
      },

      async getId(id) {
        const userModel = await models.User.findOne({
          where: { id },
          attributes: { exclude: ['password'] },
        });
        if (!userModel) return throwNotFoundError('User does not exist');
        return userModel;
      },
};

module.exports = usersService;