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
                    // getUserContact.updateAt = contact.updateAt 
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
                    .populate("sender", {username:1})

                    if(previewLastMsg && previewLastMsg.length){
                        getUserContact.updateAt = previewLastMsg[0].createAt
                        getUserContact.preview = previewLastMsg;
                    }
                    return getUserContact
            } else {
                    let getUserContact = contact.contacter
                    // getUserContact.updateAt = contact.updateAt
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
                    .populate("sender", {username:1})

                    if(previewLastMsg && previewLastMsg.length){
                        getUserContact.updateAt = previewLastMsg[0].createAt
                        getUserContact.preview = previewLastMsg;
                    }
                    return getUserContact
            }
        })
        

        let userConversations = await Promise.all(userConversationsPromise);
        let groups = await ChatGroup.find({
            "members": {$elemMatch:{"id":currentId.toString()}}
        }).sort({"updateAt": -1}).limit(20).lean()
        groupConversationsPromise = groups.map(async (group) => {
            let previewLastMsg = await Message.model.find({
                    $and: [       
                        {"senderId": group.members.map(member=> member.id)},
                        {"receiverId": group._id}
                    ]
                }).sort({"createAt": -1}).limit(1)
                group.preview = previewLastMsg;
                return group
        })
        let groupConversations = await Promise.all(groupConversationsPromise);
        let allConversations = userConversations.concat(groupConversations)
        allConversations = allConversations.sort((a,b)=>{
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

        messages.sort((a,b)=>{
            return a.createAt-b.createAt;
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
    }
})

router.get('/message/group/:id', checkLogin, async (req,res)=> {
    try {
        let groupId = req.params.id
        messages = await Message.model.find({
            "receiverId": groupId
        }).sort({"createAt": -1 }).limit(15)
        .populate("sender", {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})
        .populate("receiver", {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1}) 

        messages.sort((a,b)=>{
            return a.createAt-b.createAt;
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
    }
})


router.post('/group-chat/add-new', checkLogin, async (req,res) => {
    const {listUser,nameGroup} = req.body.data
    const currentId = req.user._id;
    const usernameCurrent = req.user.username;
    const avatarCurrent = req.user.avatar
    listUser.push({id:currentId.toString(),username:usernameCurrent,avatar: avatarCurrent})
    let newGroup = new ChatGroup({
        name: nameGroup,
        UserAmount: listUser.length,
        userId: currentId,
        members: listUser
    })
    let group = await newGroup.save();
    group && res.status(200).json({group})
})

module.exports = router;