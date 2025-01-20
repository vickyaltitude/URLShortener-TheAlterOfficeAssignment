const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require('../models/user.model');
const {generateToken} = require('../utils/generateToken');

module.exports.loginUser = async (req,res) =>{

    const  {idToken} = req.body;
    console.log(idToken)
    try{

        if(!idToken){
            return res.status(400).json({error:'Id token is required for authentication'})
        }

        let tokenVerified = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = tokenVerified.getPayload();
        
        const {sub : googleId,email,name: userName,picture} = payload;

        let user = await User.findOne({googleId: googleId})

        if(!user){
             user = new User({
                userName,
                email,
                googleId,
                picture
             });
            await user.save();
        }

        const jwtToken = generateToken(user._id,user.email);

        res.status(200).json({message:'User login success',jwtToken,userInfo:{userName,picture}})
    }catch(err){

        console.error('Error in login user controller', err);
        res.status(500).json({ message: 'Something went wrong...' });

    }

  

}

module.exports.userDetails = async (req,res) =>{
  
   res.status(200).json({userDetails: req.user})
   
}
