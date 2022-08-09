const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { InvalidFieldsError } = require('./erros');
const models = require('../database/models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const loginService = {
  async validarBody(body) {
      const schema = Joi.object({
        email: Joi.string().required().email().max(255),
        password: Joi.string().required().max(255),
      }).messages({
        'string.empty': 'Some required fields are missing',
        'any.required': 'Some required fields are missing',
      });
      const result = await schema.validateAsync(body);
      return result;
    },

    async makeToken(user) {
      // const { email, password } = user;
      // const payload = { data: { email, password } };
      const token = jwt.sign({ data: user }, secret);
      return token;
    },

    async getEmail(body) {
      const { email, password } = body;
      const user = await models.User.findOne({
        where: { email, password },
        // raw: true,
      });
      if (!user || user.password !== password) InvalidFieldsError('Invalid fields');
    const { password: _, ...userNovo } = user;
    return userNovo;
      // return user;
    },
};

module.exports = loginService;