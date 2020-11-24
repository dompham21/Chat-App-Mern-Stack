const express = require('express');
const router = express.Router()
const User = require('../models/user.models');
const checkLogin = require('../middlewares/checkLogin');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);



router.put('/user/update-avatar', checkLogin, async (req,res) => {
    try {
        const url =  req.body.data;
        const currentId = req.user._id;
        let updatedAvatar = await User.updateOne({_id:currentId},{avatar:url,updateAt: Date.now()})

        if(updatedAvatar.ok ===  1){
            res.status(200).json({updateAvatarSuccess: true})
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/user/update-info', checkLogin, async (req,res) => {
    try {
        const {address,gender,phone,username} = req.body
        const currentId = req.user._id;
        let updatedUser = await User.updateOne({_id:currentId},{
            address: address,
            gender: gender,
            phone: phone,
            username: username,
            updateAt: Date.now()
        })
        if(updatedUser.ok ===  1){
            res.status(200).json({updateInfoSuccess: true})
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/user/update-password', checkLogin, async (req,res) => {
    try {
        const {currPassword,newPassword} = req.body;
        const currentId = req.user._id;
        let user = await User.findOne({"_id":currentId},{"local":1})
        let match = await bcrypt.compare(currPassword, user.local.password)
        if(match){
            let hash = await bcrypt.hash(newPassword, salt)
            let updatedPassword = await User.updateOne({_id:currentId},{
                local:{
                    isActive: user.local.isActive,
                    password:hash,
                    email: user.local.email,
                    verifyToken: user.local.verifyToken
                }
            })
            if(updatedPassword.ok ===  1){
                res.status(200).json({updatePasswordSuccess: true})
            }
        }
        else{
            return res.json({updatePasswordSuccess: false, error:"Password was wrong!"});
        } 
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;