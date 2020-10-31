const express = require('express');
const router = express.Router()

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.models');
const { JWT_SECRET } = require('../config/key');

const salt = bcrypt.genSaltSync(10);

router.post('/signup',(req,res) => {
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
    
    User.findOne({email:email})
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
                            password: hash
                        }
                    })

                    newUser.save()
                        .then((user)=>{
                            res.status(200).json({registerSuccess: true, massage:"Saved user successfully "});
                        })
                        .catch(err=>{
                            console.error(err);
                        })
            })
        })
        .catch(err=>{
            console.error(err);
        })
        res.json({registerSuccess: true, massage:"Successfully posted!"});
})

module.exports = router;