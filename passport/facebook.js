const passport = require('passport');
const passportFacebook = require('passport-facebook');
const User = require('../models/user.models');

const facebookStrategy = passportFacebook.Strategy;

let initPassportFacebook = () => {
    passport.use(new facebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        passwordField: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"]
    },async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({"facebook.uid": profile.id});
            if(user){
                return done(null,user,res.json({msg:"done"}));
            }
            let newUser = new User({ 
                username: profile.displayName,
                gender: profile.gender,
                local: {isActive: true},
                facebook: {
                    uid: profile.id,
                    token: accessToken,
                    email: profile.emails[0].value
                }
            })
            newUser.save()
            .then(success => {
                if(success){
                    return done(null,newUser,res.json({msg:"done"}));
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
        catch(error){
            console.log(error);
        }
    }));
    
    //save userId
    passport.serializeUser((user,done) => {
        done(null, user._id)
    })

    //return userInfo to req.user
    passport.deserializeUser((id,done) => {
        User.findById({_id:id})
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err, null)
            })
    })
}

module.exports = initPassportFacebook;