const nanoid = require('nanoid');

module.exports.urlShortener = (req,res) =>{

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
   


}


module.exports.redirectHandler = (req,res) =>{

}