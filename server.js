const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./config/key');
const bodyParser = require('body-parser');
const passport = require('passport');
const initSockets = require('./sockets');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express()
//Init server with socket.io & express  

const server = require("http").Server(app);
const io = require('socket.io').listen(server);

initSockets(io);

//Init mongodb

mongoose.connect(MONGOURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('MongoDb is connecting!')
})

mongoose.connection.on('error',(err)=>{
    console.log('MongoDb connection error!',err)
})

//Config bodyParser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routers/auth.routers'));
app.use(require('./routers/contact.routers'));
app.use(require('./routers/notification.routers'))
app.use(require('./routers/message.routers'))
app.use(require('./routers/user.routers'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


server.listen(PORT,() => {
    console.log(`Server is running !`);
});
