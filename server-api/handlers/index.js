module.exports = {
  auth: require('./auth'),
  adminModule: require('./adminModule'),
  carModule: require('./carModule'),
  visitModule: require('./visitModule'),
  userModule: require('./userModule'),
  notFound: async (request, response, next) => {
    const error = new Error('Not Found'); //Defines a new error with the message 'Not found'
    error.status = 404; //Assigns newely defined error an error code of '400'
    next(error); //Calls the next fnction, and sends that const err into the function
  },
  errorHandlers: async(error, request, response, next) => {
    try {
      response.status(error.status || 400).json({
        errorMessage: error.message || 'Something went wrong. Try again later',
        error: request.app.get('env') === 'development' ? error : {}
      });
    } catch (err) {
      next(err)
    };
  }
};
