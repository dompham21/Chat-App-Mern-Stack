const express = require('express');
const router = express.Router()
const User = require('../models/user.models');
const Contact = require('../models/contact.models');
const Notification = require('../models/notification.models');
const checkLogin = require('../middlewares/checkLogin');

router.get('/contact/find-users', checkLogin, async (req,res) => {
    try {
        const query = req.headers.query;
        const currentId = req.user._id;

        let users = await User.find({
            $and: [

                {"_id": {$nin: currentId}},
                {"username": {"$regex": new RegExp(query,"i") }}
            ]
        },{_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})
        if(users){
            return res.status(200).json({users:users});
        } 
    } catch (error) {
        console.log(error);
    }
})

router.post('/contact/add-new', checkLogin, async (req,res) => {
    try {
        const currentId = req.user._id;
        const contactId = req.body.uid;

        let matched = await Contact.findOne({
            $or: [
                {$and:[
                    {"userId": currentId },
                    {"contactId": contactId}
                ]},
                {$and:[
                    {"userId": contactId },
                    {"contactId": currentId}
                ]}
            ]
        })
        if(matched){
            return res.status(400).json({addSucess: false,error:"Contact already exists"})
        }
        else{
            //create new contact 
            const newContact =  new Contact({
                userId: currentId,
                contactId: contactId
            })
            let contact = await newContact.save()

            //create new notification 
            const newNotification = new Notification.model({
                senderId: currentId,
                receiverId: contactId,
                types: Notification.types.ADD_CONTACT
            })
            let notification = await newNotification.save();
            return res.status(200).json({addSuccess: true,msg:"Saved successfully"})
        
        }
    } catch (error) {
        console.log(error);
    } 
})

router.get('/contact/list-users', checkLogin, async (req,res) => {
    try {
        const currentId = req.user._id;
        let contacts = await Contact.find({
            $and: [
                {$or: [
                    {"userId": currentId},
                    {"contactId": currentId}
                ]},{
                    "status": true
                }
            ]
            
        }).sort({"createAt":-1}).limit(12)
        if(contacts){
            let users = contacts.map(async (contact) => {
                if(contact.contactId == currentId){
                    return await User.findById(contact.userId,
                        {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})
                }else {
                    return await User.findById(contact.contactId,
                        {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})
                     
                }
            })
             res.status(200).json(await Promise.all(users));
        } 
        
    } catch (error) {
        console.log(error);
    }
})

router.get('/contact/waiting-request', checkLogin, async (req,res) => {
    try {
        const currentId = req.user._id;
        let contacts = await Contact.find({
            $and: [
                {
                    "userId": currentId
                }
                ,{
                    "status": false
                }
            ]
            
        }).sort({"createAt":-1}).limit(12)
        if(contacts){
            let users = contacts.map(async (contact) => {
                return await User.findById(contact.contactId,
                        {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})
            })
             res.status(200).json(await Promise.all(users));
        } 
        
    } catch (error) {
        console.log(error);
    }
})

router.get('/contact/friend-request', checkLogin, async (req,res) => {
    try {
        const currentId = req.user._id;
        let contacts = await Contact.find({
            $and: [
                {
                    "contactId": currentId
                }
                ,{
                    "status": false
                }
            ]
            
        }).sort({"createAt":-1}).limit(12)
        if(contacts){
            let users = contacts.map(async (contact) => {
                return await User.findById(contact.userId,
                        {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})
            })
             res.status(200).json(await Promise.all(users));
        } 
        
    } catch (error) {
        console.log(error);
    }
})

router.delete('/contact/remove-request', checkLogin, async (req,res) => {
    try {
        const currentId = req.user._id;
        const contactId = req.body.uid;
        let successAddContact = await Contact.deleteOne({
            $and:[
                {"userId": currentId },
                {"contactId": contactId}
            ]
        });
        let successAddNotification = await Notification.model.deleteOne({
            $and:[
                {"senderId": currentId },
                {"receiverId": contactId},
                {"types": Notification.types.ADD_CONTACT}
            ]
        })
        if(successAddContact && successAddNotification){
            return  res.status(200).json({removeSuccess: true, msg:"Removed successfully"})
        }
        
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;