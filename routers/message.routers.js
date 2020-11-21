const express = require('express');
const router = express.Router()
const checkLogin = require('../middlewares/checkLogin');
const Message = require('../models/message.models');
const User = require('../models/user.models');
const Contact = require('../models/contact.models');
const ChatGroup = require('../models/chatGroup.models');
const _ = require('lodash');
const request = require('request');



router.get('/message/get-all-conversations',checkLogin , async (req,res) => {
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
            
        }).sort({"updateAt":-1}).limit(20).lean()
        .populate("user", {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})
        .populate("contacter", {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})


        let userConversationsPromise = contacts.map(async (contact) => {
            if(contact.contactId == currentId){
                    let getUserContact = contact.user
                    getUserContact.updateAt = contact.updateAt 
                    let previewLastMsg = await Message.model.find({
                        $or: [
                            {$and: [
                                {"senderId": contact.userId },
                                {"receiverId": currentId}
                            ]},
                            {$and: [
                                {"senderId": currentId},
                                {"receiverId": contact.userId }
                            ]}
                        ]
                    }).sort({"createAt": -1}).limit(1)
                    getUserContact.preview = previewLastMsg;

                    return getUserContact
            } else {
                    let getUserContact = contact.contacter
                    getUserContact.updateAt = contact.updateAt
                    let previewLastMsg = await Message.model.find({
                        $or: [
                            {$and: [
                                {"senderId": contact.contactId },
                                {"receiverId": currentId}
                            ]},
                            {$and: [
                                {"senderId": currentId},
                                {"receiverId": contact.contactId }
                            ]}
                        ]
                    }).sort({"createAt": -1}).limit(1)
                    getUserContact.preview = previewLastMsg; 
                    return getUserContact
            }
        })
        
        let userConversations = await Promise.all(userConversationsPromise);
        let groupConversations = await ChatGroup.find({
            "members": {$elemMatch: {"userId": currentId}}
        }).sort({"updateAt": -1}).limit(20).lean();
      

        let allConversations = userConversations.concat(groupConversations)

        allConversations.sort((a,b)=>{
            return b.updateAt-a.updateAt;
        })

        return res.status(200).json({
            allConversations:allConversations,
            userConversations:userConversations,
            groupConversations:groupConversations
        })
    } catch (error) {
        console.log(error);
    }
})



router.get('/message/:id', checkLogin, async (req,res)=> {
    try {
        let userId = req.params.id
        let currentId = req.user._id
        messages = await Message.model.find({
            $or: [
                {$and: [
                    {"senderId": userId},
                    {"receiverId": currentId}
                ]},
                {$and: [
                    {"senderId": currentId},
                    {"receiverId": userId}
                ]}
            ]
        }).sort({"createAt": -1 }).limit(15)
        .populate("sender", {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})
        .populate("receiver", {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1}) 

        await Contact.updateOne({
            $or: [
                {$and: [
                    {"userId": userId},
                    {"contactId": currentId},
                    {"status": true}
                ]},
                {$and: [
                    {"userId": currentId},
                    {"contactId": userId},
                    {"status": true}
                ]}
            ]
        },{
            "updateAt": Date.now()
        })
        messages.sort((a,b)=>{
            return a.createAt-b.createAt;
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
    }
})

router.get('/test',checkLogin, async (req,res)=>{
    // let userId = req.params.id
    let currentId = req.user._id

    let contacts = await Contact.find({
        $and: [
            {$or: [
                {"userId": currentId},
                {"contactId": currentId}
            ]},{
                "status": true
            }
        ]
        
    }).sort({"updateAt":-1}).limit(20)
    .populate("user")
    .populate("contacter")
    res.status(200).json(contacts)
})

router.get('/chatvideo/get-ice-turnserver',checkLogin, async (req,res) => {
    let o = {
        format: "urls"
    };

    let bodyString = JSON.stringify(o);
    let options = {
        url:"https://global.xirsys.net/_turn/MyFirstApp",
        // host: "global.xirsys.net",
        // path: "/_turn/MyFirstApp",
        method: "PUT",
        headers: {
            "Authorization": "Basic " + Buffer.from("dompham21:beb100f2-2b0c-11eb-a35d-0242ac150003").toString("base64"),
            "Content-Type": "application/json",
            "Content-Length": bodyString.length
        }
    };

    request(options,(error,response,body)=>{
        if(error){
            console.log(error)
            return;
        }
        let bodyJson = JSON.parse(body);
        res.status(200).json(bodyJson.v)
    })
})


module.exports = router;