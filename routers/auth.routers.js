const express = require('express');
const router = express.Router()

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.models');
const { JWT_SECRET } = require('../config/key');
const sendMail = require('../config/mailer');
const  transMail   = require('../lang/vn');
const { v4: uuidv4 } = require('uuid');
const { findOneAndUpdate } = require('../models/user.models');
const salt = bcrypt.genSaltSync(10);



router.post('/signup',(req,res) => {
    console.log(req.body);
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
    
    User.findOne({"local.email":email})
        .then(savedUser => {
            if(savedUser){
                return res.status(400).json({registerSuccess: false, error:"User already exists with that email!"});
            }
            bcrypt.hash(password, salt)
                .then(hash => {
                    const newUser = new User({
                        username: name,
                        local: { 
                            email: email,
                            password: hash,
                            verifyToken: uuidv4()
                        }
                    })

                    newUser.save()
                        .then((user)=>{
                            let linkVerify = `${req.protocol}://${req.get("host")}/verify/${user.local.verifyToken}`
                            console.log(transMail.subject)
                            sendMail(user.local.email,transMail.subject, transMail.template(linkVerify))
                                .then(success => {
                                    console.log(success);
                                    if(success)
                                        return res.status(200).json({registerSuccess: true, massage:"Saved user successfully "});
                                })
                                .catch(err=>{
                                    User.findByIdAndRemove({_id:user._id}); //remove user when can't send mail
                                    console.error(err);
                                    return res.status(400).json({registerSuccess: false, error:"Can't send mail to verify"});
                                })
                        })
                        .catch(err=>{
                            console.error(err);
                        })
                })
        })
        .catch(err=>{
            console.error(err);
        })
})

router.get('/verify/:token',(req,res)=>{
    const {token} = req.params;
    User.findOneAndUpdate({"local.verifyToken": token},{"local.isActive": true,"local.verifyToken": null})
    .then(success => {
        if(success)
        return res.json({msg:"Verify success"});
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;