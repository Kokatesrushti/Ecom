const express = require('express');
const cors = require('cors'); 
require('dotenv').config();
const ConnectDB = require('./config/db');
const session= require('express-session');
const cookieParser = require('cookie-parser'); 



//model
const User = require('./models/userModel')

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());
let bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}));


const router = require('./routes/index');
const passport=require("passport");
const LocalStrategy=require("passport-local");

  
const sessionOptions={

    secret:"secretcode",
    resave:false, 
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        httpOnly:true,
    },
};

app.use(session(sessionOptions));




app.use(passport.initialize());
app.use(passport.session()); // a web application needs the ability to identify users as they beows from page to page.this series of requests and responses ,each associated with the same user ,is known as a session.

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //to store info related to user into the session.
passport.deserializeUser(User.deserializeUser()); // remove info after user end session

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
});




app.use("/",router)

ConnectDB().then(()=>{
    app.listen(8080,()=>{
        console.log('server is running');
    })
})