const express = require('express');
const router = express.Router()
const User = require('../models/user.models');

router.get('/getall',(req,res) => {
    const query = req.query.username;
    User.find()
    .then(users=>{
        if(!users){
            return res.status(400).json({msg:"false"})
        }
        const matchedUser = users.filter((user) => {
            return user.username.indexOf(query) !== -1
        })
        return res.status(200).json({users:matchedUser});
    })
})

module.exports = router;