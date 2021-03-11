const router = require('express').Router(); 
const handle = require('../handlers/index');

router.post('/login', handle.auth.login);
router.get('/register', handle.auth.register);

module.exports = router;
