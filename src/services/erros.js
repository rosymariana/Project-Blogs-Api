const throwNotFoundError = (message) => {
    const err = new Error(message);
    err.name = 'NotFoundError';
    throw err;
  };
  
  const InvalidFieldsError = (message) => {
    const err = new Error(message);
    err.name = 'InvalidFieldsError';
    throw err;
  };

  const emailError = (message) => {
    const err = new Error(message);
    err.name = 'EmailError';
    throw err;
  };

  const tokenError = (message) => {
    const err = new Error(message);
    err.name = 'tokenError';
    throw err;
  };
  
  module.exports = {
    throwNotFoundError,
    InvalidFieldsError,
    emailError,
    tokenError,
  };