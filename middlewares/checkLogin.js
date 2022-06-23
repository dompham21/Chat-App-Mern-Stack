const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user.models');
const { JWT_SECRET } = require('../config/key');

module.exports = (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(400).json({
            isAuth: false,
            error: true,
            message: "You must be logged in"
        });
    }
    const token = authorization.replace("Bearer ","");

    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(400).json({
                isAuth: false,
                error: true,
                message: "You must be logged in"
            });
        }

        const {_id} = payload;
        User.findById(_id).then(userData=>{
            if (!userData) return res.status(400).json({ isAuth: false, error: true })

            req.user = userData;
            req.user.local.password  = undefined;
            next();
        })
    })
}