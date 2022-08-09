const jwt = require('jsonwebtoken');
const { tokenError } = require('../services/erros');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const errorTokenMiddleware = {
    async verifyToken(token) {
        try {
            const data = jwt.verify(token, secret);
            console.log(data.dataValues.id);
            return data;
        } catch (error) {
            tokenError('Expired or invalid token');
        }
    },
};

module.exports = errorTokenMiddleware;