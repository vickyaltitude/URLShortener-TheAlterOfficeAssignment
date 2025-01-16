const UrlData = require('../models/urlShortener.model')
const baseUrl = process.env.BASE_ANALYTICS_URL;

module.exports.getUrlData = async (req,res) =>{

  try{
     
    const {alias} = req.params
    let currentUser = req.user._id;

    if(!currentUser){
        return res.status(401).json({error:'User not logged in'})
    }
    
    const getUrlData = await UrlData.findOne({shortUrl: `${baseUrl}/${alias}`});

    if(!getUrlData){
       return res.status(404).json({error:'Given url not found'})
    }

    if(getUrlData.owner.toString() !== currentUser.toString()){
        return res.status(401).json({error:'You are not owner of this URL'})
    }
    
    res.status(200).json({
         totalClicks: getUrlData.totalClicks,
         uniqueUsers: getUrlData.uniqueUsers,
         clicksByDate: getUrlData.clicksByDate,
         osType: getUrlData.analytics.osType,
         deviceType: getUrlData.analytics.deviceType
    })


  }catch(err){
      console.log(`error in get url data controller`,err)
      res.status(500).json({ error: 'Internal server error.. something went wrong' });
  }

}