const nanoid = require('nanoid');
const UrlData = require('../models/urlShortener.model');
const baseUrl = process.env.BASE_URL

module.exports.urlShortener = async (req,res) =>{

    try{
         
        
     if(!req.user){
        return res.status(400).json({error: 'User not authorized to access this functionality... Please login first'})
     }

   let {longUrl,customAlias,topic} = req.body;

   if(!longUrl){
     return res.status(400).json({error: 'Long url must be provided'})
   }
   if((customAlias && customAlias.length < 5) || (customAlias && customAlias.length > 10) ){
    return res.status(400).json({error: 'Custom alias should be exactly 5 to 10 characters'})
   }

   if(!customAlias){
      customAlias = nanoid(8);
   }
  
   if(!topic){
    topic = 'others'
   }

   let existUrlCheck = await UrlData.findOne({ $or:[{longUrl : longUrl},{shortUrl: longUrl} ] })

   if(existUrlCheck){
    res.status(200).json({shortUrl : existUrlCheck.shortUrl,createdAt: existUrlCheck.createdAt})
   }
   

    let newUrl = new UrlData({
        longUrl,
        shortUrl: `${baseUrl}/${customAlias}`,
        owner : req.user_id,
        categor: topic
    })
     

     await newUrl.save()
    
     res.status(201).json({shortUrl: newUrl.shortUrl, createAt: newUrl.createdAt})

    }catch(err){

        
        console.error('Error in url handler controller', err);
        res.status(500).json({ message: 'Something went wrong...' });

    }


}


module.exports.redirectHandler = (req,res) =>{

}