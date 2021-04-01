//Exported Routes to index file to match routes with paths, to call a route from this file simply instantiate the file and call "name"."function" 
//Note: Passport.JS is included to handle authentication of users, if the auth object isn't passed into the handler function it means the user isnt authenticated
module.exports.auth = require('./auth');
module.exports.carModule = require('./carModule');
module.exports.visitModule = require('./visitModule');
module.exports.userModule = require('./userModule');
module.exports.adminModule = require('./adminModule');