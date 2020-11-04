const express = require('express');
const router = express.Router()

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.models');
const { JWT_SECRET } = require('../config/key');
const sendMail = require('../config/mailer');
const  transMail   = require('../lang/vn');
const { v4: uuidv4 } = require('uuid');

const passport = require('passport');
const initPassportFacebook = require('../passport/facebook');
const initPassportGoogle = require('../passport/google');
const salt = bcrypt.genSaltSync(10);

const checkLogin = require('../middlewares/checkLogin');

initPassportFacebook();
initPassportGoogle();

router.post('/signup', async (req,res) => {
    const {name, email, password, confirmPassword} = req.body;

    if(!email || !password || !name || !confirmPassword) {
        return res.status(400).json({registerSuccess: false, error:"Please add all the fields!"});
    }
    if(password !== confirmPassword) {
        return res.status(400).json({registerSuccess: false, error:"The password confirm doesn't macth "});
    }
    if(!password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)){
        return res.status(400).json({registerSuccess: false, error:"Your password must be 8 characters, and include at least one lowercase letter, one uppercase letter, and a number"})
    }
    
    let savedUser = await User.findOne({"local.email":email})

    if(savedUser){
        return res.status(400).json({registerSuccess: false, error:"User already exists with that email!"});
    }

    let hash = await bcrypt.hash(password, salt)
    const newUser = new User({
        username: name,
        local: { 
            email: email,
            password: hash,
            verifyToken: uuidv4()
        }
    })

    let user =  await newUser.save()
    let linkVerify = `${req.protocol}://${req.get("host")}/verify/${user.local.verifyToken}`;

    sendMail(user.local.email,transMail.subject, transMail.template(linkVerify))
        .then(success => { 
            return res.status(200).json({registerSuccess: true, massage:"Saved user successfully "});
        })
        .catch(async (error) => {
            await User.findByIdAndRemove({_id:user._id}); //remove user when can't send mail
            console.error(err);
            return res.status(400).json({registerSuccess: false, error:"Can't send mail to verify"});
        })
                           
})

router.get('/verify/:token', async (req,res) => {
    try {
        const {token} = req.params;

        let success = await User.findOneAndUpdate({"local.verifyToken": token},{"local.isActive": true,"local.verifyToken": null})
        if(success){ 
        return res.json({msg:"Verify success"});
        }
    } catch (error) {
        console.log(error)   
    }
})

router.post('/signin', async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({loginSuccess: false, error:"Please provide email or password!"});
        }
        let savedUser = await User.findOne({"local.email":email})
        if(!savedUser){
            return res.status(400).json({loginSuccess: false, error:"Invalid email or password!"});
        }
        if(!savedUser.local.isActive){
            return res.status(400).json({loginSuccess: false, error:"The email has been registered but not activated"})
        }
        let match = await bcrypt.compare(password, savedUser.local.password)
        if(match){
            const token = jwt.sign({_id: savedUser._id},JWT_SECRET);
            const {_id,username,avatar,role} = savedUser;
            res.status(200).json({ loginSuccess: true, massage:"Login successfully!", token:token,user:{_id,username,avatar,role}})
        }
        else{
            return res.status(400).json({loginSuccess: false, error:"Invalid email or password!"});
        }
    } catch (error) {
        console.log(error);
    }   
})  

router.get('/logout',checkLogin,  (req,res) => {
    return res.status(200).json({msg:"Logout successfully"})
})
router.get('/auth/facebook', passport.authenticate("facebook", {scope: ["email"]}))

router.get('/auth/facebook/callback', passport.authenticate("facebook"))

router.get('/auth/google', passport.authenticate("google", {scope: ["email"]}))

router.get('/auth/goole/callback', passport.authenticate("google"))
module.exports = router;