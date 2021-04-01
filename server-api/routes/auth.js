const router = require('express').Router(); 
const handle = require('../handlers/index');

// Route called to handle login, handler is imported from the handler.auth which inclides the proper functions to handle login.
router.post('/login', handle.auth.login);
// Route called to handle inserting default admin user into database, which can then now be logged into to create different kinds of users.
// Default password and username are 
router.get('/register', handle.auth.register);

module.exports = router;
