const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./config/key');
const bodyParser = require('body-parser');

const app = express();

const PORT = 8000;

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


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routers/auth.routers'));
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}!`);
});
