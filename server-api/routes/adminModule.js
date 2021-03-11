const router = require('express').Router(); 
const handle = require('../handlers/index');

const passport = require('passport');
const passportConfig = require('../middleware/passport'); //don't delete its being used

const auth = passport.authenticate('jwt', {session: false});
router.post('/registeruser',auth, handle.adminModule.registerUser);

module.exports = router;