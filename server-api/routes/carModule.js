const router = require('express').Router();
const handle = require('../handlers/index');

const passport = require('passport');
const passportConfig = require('../middleware/passport'); //don't delete its being used
const auth = passport.authenticate('jwt', {
    session: false
});

// Post requests to input data into database handled by fuctions imported from the handler.carmodule 
router.post('/registercar', auth, handle.carModule.registerCar);
router.post('/createnewvehiclelog', auth, handle.carModule.createVehicleEntry);
router.post('/editProfile', handle.carModule.editProfile);

// Get request to fetch data from database handled by functions found in the handler.carmodule
router.get('/closevehiclelog/:id', auth, handle.carModule.closeVehicleEntry);
router.get('/viewcarsonsite', auth, handle.carModule.viewCarsOnsite);
router.get('/viewcarlog', auth, handle.carModule.viewCarLog);
router.get('/viewregisteredcars', auth, handle.carModule.viewRegisteredCars);
router.get('/editprofile/:id', handle.carModule.getProfileInfo);


module.exports = router;
