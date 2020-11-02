const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./config/key');
const bodyParser = require('body-parser');
const passport = require('passport');

require('dotenv').config();

const app = express();

const PORT = 5000 || process.env.PORT;

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routers/auth.routers'));
app.use(require('./routers/user.routers'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.use(express.static('client/public/images'))


app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}!`);
});
