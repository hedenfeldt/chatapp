const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors({ origin: '*' }))
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://Hedenfeldt:Hedenfeldt@cluster0.j6moaf4.mongodb.net/?retryWrites=true&w=majority')
app.use(express.json())

const messageSchema = new mongoose.Schema({
    message:{
        type:String,
        require: true,
    },
},
{timestamps:true}
)

const Message = mongoose.model('Message', messageSchema)

app.get('/messages', async (req,res)=>{
    const messages = await Message.find()
    res.send(messages)
})

app.post('/message', async(req,res)=>{
    const {message} = req.body
    await Message.create({message: message})
    res.send('ok')
})

app.listen(3000)