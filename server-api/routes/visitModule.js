const router = require('express').Router();
const handle = require('../handlers/index');

const passport = require('passport');
const passportConfig = require('../middleware/passport'); //don't delete its being used
const auth = passport.authenticate('jwt', {
    session: false
});

// Requests 
router.post('/lognewvisit', auth, handle.visitModule.logNewVisit);
router.post('/editlog', auth, handle.visitModule.updateLogEntry)
router.post('/searchusersforvisit', auth, handle.visitModule.searchForUsers);
router.get('/closelogvisit/:id', auth, handle.visitModule.closeVisit);
router.get('/viewvisits', auth, handle.visitModule.viewVisits);
router.get('/viewactivevisits', auth, handle.visitModule.viewActiveVisits);
router.get('/getuser/:id', auth, handle.visitModule.getUser);
router.get('/findappointment/:id', auth, handle.visitModule.findAppointment);
router.get('/editlog/:id', auth, handle.visitModule.getLogProfile);

module.exports = router;
