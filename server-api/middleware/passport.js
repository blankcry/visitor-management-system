const passport = require('passport');
const passportJwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const db = require('../models/index');

passport.use(new passportJwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        db(process.env.ACCOUNTDB).where('username', payload.username)
        .first()
        .then(user => {
            //if user doesnt exist handle it  
            if (!user) {
                return done(null, false)
            } else {
                //otherwise return user
                return done(null, user)
            }
        })
    } catch(error) {
        done(error, false);
    };
}));


