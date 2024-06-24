import message from '../models/messageModel.js';
import Conversation from "../models/conversationModel.js"
import io from "../socket/socket.js"

export const sendMessage = async (req, res) => {
    try{
        const {recipientId} = req.params
        const {senderId} = req.user._id
        const {message} = req.body

        const conversation = await Conversation.findOne({
          participants:{$all: [senderId, recipientId]}
        })

        if(!Conversation) {
            Conversation = new Conversation({
                participants: {senderId, recipientId},
                lastMessage:{
                    text:message,
                    sender:senderId,
                }
            })
            await Conversation.save()
        }

        // const receivedMessage = getRecipientSocketId(recipientId)

        const newMessage = new message({
            conversationId: Conversation._id,
            sender: senderId,
            text: message,
        })

        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage:{
                    text:message,
                    sender:senderId
                }
            })
        ])

        const receivedMessage = getRecipientSocketId(recipientId)
        if(receivedMessage) {
            io.to(receivedMessage).emit('newMessage', newMessage)
        }

        res.status(200).json(newMessage)
              
    } catch (error) {

    }
}
export const getMessage = () => {}
export const deleteMessage = () => {}
export const updateMessage = () => {}
