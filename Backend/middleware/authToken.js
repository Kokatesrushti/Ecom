//this middleware works when user is signed in
//cooken contain signed data in token => const token = req.cookies?.token
//if user is logned in there will be token
//then we will verify token by jwt using verify =>  jwt.verify(token, process.env.JWT_SECRET,function(err,decoded)
//we will create a field req.user.id if not exist =>  req.user = {};
//after verifying token it return decoded 
//if decoded contain id will store it in req.user.id => req.user.id = decoded?._id
//userDetails will use this info

const jwt = require('jsonwebtoken')

async function authToken (req,res,next){
    try {
        const token = req.cookies?.token
        if(!token){
            return res.status(200).json({
                 message : "Please login ...",
                 error : true,
                 success : false
             })
         }

        jwt.verify(token, process.env.JWT_SECRET,function(err,decoded){
            if(err){

            }
            // console.log("decoded info from token :",decoded);
            if (!req.user) {
                req.user = {};
            }
            req.user.id = decoded?._id
            next()
        })
    } catch (err) {
        res.status(400).json({
            message : err.message||err,
            data:[],
            error : true,
            success : false
        })
    }
}



module.exports =authToken