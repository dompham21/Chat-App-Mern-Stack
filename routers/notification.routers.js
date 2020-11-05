const express = require('express');
const router = express.Router()
const User = require('../models/user.models');
const Contact = require('../models/contact.models');
const Notification = require('../models/notification.models');
const checkLogin = require('../middlewares/checkLogin');

router.get('/get/notification', checkLogin, async (req,res) => {
    try {
        const currentId = req.user._id;

        let notifications = await Notification.model.find({"receiverId": currentId}).sort({"createAt": 1}).limit(10);
        if(!notifications){
            return res.status(400).json({msg:"Emtry notifications"})
        }
        getNotifications = notifications.map( async (notification) => {
            let sender = await User.findById({"_id": notification._id});
            return {senderId: sender._id,notificationType: notification.types,senderName: sender.username,senderAvatar: sender.avatar};
        })
        res.status(200).json(await Promise.all(getNotifications))
    } catch (error) {
        console.log(error);
    }    
})



module.exports = router;