import { Server } from "socket.io";
import express from 'express';
import http from 'http'
import Message from "../models/message.model.js"
import conversation from "../models/conversation.model.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: "http://localhost:7979",
        methods: ["GET", "POST","DELETE","PATCH"]
    }
})

export const getrecipientId = (receipientId) => {
    return Socket[receipientId]
}
const socketMap = {}

io.on('connection', (socket) => {
    console.log('connected succesfully', socket.id);
    const userId = socket.handshake.query.userId
    if (userId !== 'undefined') socketMap[userId]
    io.emit('check online users', Object.keys (socketMap))
 socket.on('markMessageAsRead', async({conversationId, userId})=>{
    try{
        await Message.updateMany({conversationId: conversationId, seen:false}, {$set: {seen:true}})
            await conversation.updateOne({_id:conversationId},{$set:{seen:true}})
        
    } catch(error){
        console.log(error);
    
    }})

    socket.on('disconnect', () => {
        console.log('user disconnected successfuly');
        delete socketMap[userId];
        io.to(socketMap[userId])
    })
})