const router = require('express').Router();
const handle = require('../handlers/index');

const passport = require('passport');
const passportConfig = require('../middleware/passport'); //don't delete its being used

const auth = passport.authenticate('jwt', {session: false});

router.post('/registercar', auth, handle.carModule.registerCar);

router.post('/createnewvehiclelog', auth, handle.carModule.createVehicleEntry);

router.get('/closevehiclelog/:id', auth, handle.carModule.closeVehicleEntry);

router.get('/viewcarsonsite', auth, handle.carModule.viewCarsOnsite);
router.get('/viewcarlog', auth, handle.carModule.viewCarLog);

router.get('/viewregisteredcars', auth, handle.carModule.viewRegisteredCars);

router.get('/editprofile/:id', handle.carModule.getProfileInfo);
router.post('/editProfile', handle.carModule.editProfile);

module.exports = router;
