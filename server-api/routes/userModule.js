const router = require('express').Router(); 
const handle = require('../handlers/index');

const passport = require('passport');
const passportConfig = require('../middleware/passport'); //don't delete its being used

const auth = passport.authenticate('jwt', {session: false});

router.post('/createappointment', auth, handle.userModule.createNewAppointment);
router.delete('/deleteappointment/:id', auth, handle.userModule.deleteAppointment);
router.get('/viewappointments', auth, handle.userModule.viewAppointment);
router.get('/editappointment/:id', auth, handle.userModule.getAppointment)
router.put('/editappointment', handle.userModule.editAppointment)
router.get('/viewpersonalvisits', auth, handle.userModule.viewVisits)

module.exports = router