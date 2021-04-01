const router = require('express').Router(); 
const handle = require('../handlers/index');
// Passport.JS is included to handle authentication of users, if the auth object isn't passed into the handler function it means the user isnt authenticated
const passport = require('passport');
const passportConfig = require('../middleware/passport'); //don't delete its being used
const auth = passport.authenticate('jwt', {
    session: false
});

// Post call to register new user, note only admin users can request this route succesfully, function to handle this is found in the handlers.adminModule
router.post('/registeruser',auth, handle.adminModule.registerUser);

module.exports = router;