const errors = {
    ValidationError: 400,
    InvalidFieldsError: 400,
    UnauthorizedError: 401,
    NotFoundError: 404,
    EmailError: 409,
    tokenError: 401,
  };
  
  /**
   * @param {Error} err 
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   * @param {import('express').NextFunction} next 
   */
  const errorHandlerMiddleware = ({ name, message }, _req, res, _next) => {
    console.log('Message', message, 'error', errors[name]);
    const status = errors[name];
    if (!status) return res.sendStatus(500);
    res.status(status).json({ message });
  };
  
  module.exports = errorHandlerMiddleware;