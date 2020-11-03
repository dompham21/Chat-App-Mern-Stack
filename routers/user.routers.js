const express = require('express');
const router = express.Router()
const User = require('../models/user.models');
const Contact = require('../models/contact.models');
router.get('/search/byusername',(req,res) => {
    const query = req.query.username;
   
   
    User.find({
        $and: [
            // {"_id": {$nin: req.user._id}},
            {"username": {"$regex": new RegExp(query,"i") }}
        ]
    })
    .then((users)=>{
        console.log(users)
        return res.status(200).json({users:users});
    })

})

module.exports = router;