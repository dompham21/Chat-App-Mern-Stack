const express = require('express');
const router = express.Router()
const User = require('../models/user.models');
const Contact = require('../models/contact.models');
const Notification = require('../models/notification.models');
const checkLogin = require('../middlewares/checkLogin');

router.get('/get/notification', checkLogin, async (req,res) => {
    try {
        const currentId = req.user._id;

        let notifications = await Notification.model.find({"receiverId": currentId}).sort({"createAt": -1}).limit(10);
        if(!notifications){
            return res.json({msg:"Emtry notifications"})
        }
        let getNotifications = notifications.map( async (notification) => {
            let sender = await User.findById({"_id": notification.senderId});
            return {senderId: sender._id,notificationType: notification.types,senderName: sender.username,senderAvatar: sender.avatar};
        })
        res.status(200).json(await Promise.all(getNotifications))
    } catch (error) {
        console.log(error);
    }    
})

router.get('/count/notification', checkLogin, async (req,res) => {
    try {
        const currentId = req.user._id;
        let notificationUnRead = await Notification.model.countDocuments({
            $and: [
                {
                    "receiverId":currentId 
                },{
                    "isRead": false
                }
            ]
        })

        return res.status(200).json(notificationUnRead);
      
    } catch (error) {
        console.log(error)
    }
})
router.put('/notification/all-as-read', checkLogin, async (req,res) => {
    try {
        const targetUsers = req.body.targetUsers;
        const currentId = req.user._id;
        let notificationRead = await Notification.model.updateMany({
            $and: [
                {
                    "receiverId":currentId 
                },{
                    "senderId": {$in: targetUsers}
                },
                {
                    "isRead": false
                }
            ]
        },{
            $set:{"isRead": true}
        })
        if(notificationRead.ok == 1){
            res.status(200).json({readSuccess:true})
        }
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;