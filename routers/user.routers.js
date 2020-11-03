const express = require('express');
const router = express.Router()
const User = require('../models/user.models');
const Contact = require('../models/contact.models');

const checkLogin = require('../middlewares/checkLogin');

router.get('/search/byusername',checkLogin,(req,res) => {
    const query = req.headers.query;
   
   console.log(query);
    User.find({
        $and: [
            {"_id": {$nin: req.user._id}},
            {"username": {"$regex": new RegExp(query,"i") }}
        ]
    })
    .then((users)=>{
        return res.status(200).json({users:users});
    })

})

module.exports = router;