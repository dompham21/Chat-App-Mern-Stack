const express = require('express');
const router = express.Router()
const checkLogin = require('../middlewares/checkLogin');
const Message = require('../models/message.models');
const User = require('../models/user.models');
const Contact = require('../models/contact.models');
const ChatGroup = require('../models/chatGroup.models');
const _ = require('lodash');


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

        allConversations = _.sortBy(allConversations,(item)=> {
            return item.updateAt
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
        }).sort({"createT": -1 }).limit(30)
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


module.exports = router;