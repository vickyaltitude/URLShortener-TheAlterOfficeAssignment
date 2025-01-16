const jwt = require('jsonwebtoken');
const Users = require('../models/user.model');


module.exports.authProtectRoute = async (req, res, next) => {

  
    try{
        const token = req.headers['authorization'];

        if(token === 'null'){
        
           return res.status(400).json({error:"Please login"})
        }
 
        const decode = jwt.verify(token,process.env.JWT_SECRET);
      
        if(!decode){
         return res.status(400).json({error:"Authentication token is invalid"})
        }
 
        const user = await Users.findOne({_id: decode.userId});
 
        if(!user){
         return res.status(400).json({error:"User not found"})
        }
 
        req.user = user;
        next();
     }catch(err){
         console.log('Error in protectgetmeroute middleware function',err)
         res.status(500).json({error:"Internal server error"})
     }
}

