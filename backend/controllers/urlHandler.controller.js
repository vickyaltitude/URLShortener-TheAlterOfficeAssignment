const express = require('express')
const app = express();
const useragent = require('express-useragent');
const {nanoid} = require('nanoid');
const UrlData = require('../models/urlShortener.model');
const axios = require('axios')
const baseUrl = process.env.BASE_URL

app.use(useragent.express());


module.exports.urlShortener = async (req,res) =>{

    try{
         
        
     if(!req.user){
        return res.status(400).json({error: 'User not authorized to access this functionality... Please login first'})
     }
   
   let {longUrl,customAlias,category} = req.body;

   let existUrlCheck = await UrlData.findOne({ $or:[{longUrl : longUrl},{shortUrl: `${baseUrl}/${customAlias}`} ] })

   if(customAlias && existUrlCheck){
    let aliasCheck = existUrlCheck.shortUrl.split('/')
       if(customAlias === aliasCheck[aliasCheck.length-1]){
        return res.status(401).json({error: 'Custom alias already taken'})
       }
   }

   if(!longUrl){
     return res.status(400).json({error: 'Long url must be provided'})
   }
   if((customAlias && customAlias.length < 5) || (customAlias && customAlias.length > 10) ){
    return res.status(400).json({error: 'Custom alias should be exactly 5 to 10 characters'})
   }

  

   if(!customAlias){
      customAlias = nanoid(8);
   }
  
   if(!category){
    category = 'others'
   }

   if(existUrlCheck){
     return res.status(401).json({error: 'Url already exists'})
   }
   

    let newUrl = new UrlData({
        longUrl,
        shortUrl: `${baseUrl}/${customAlias}`,
        owner : req.user._id,
        category
    })
     

     await newUrl.save()
    
     res.status(201).json({shortUrl: newUrl.shortUrl, createAt: newUrl.createdAt})

    }catch(err){

        
        console.error('Error in url handler controller', err);
        res.status(500).json({ message: 'Something went wrong...' });

    }


}


module.exports.redirectHandler = async (req,res) =>{

    
    const uAgent = req.headers['user-agent'];
    const {alias} = req.params;
  
    const uaDetails = useragent.parse(uAgent);
  
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
  
    try {
      const geoResponse = await axios.get(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`);
      const geoData = geoResponse.data;
   
       let checkUrl = await UrlData.findOne({shortUrl: `${baseUrl}/${alias}`});

      if(!checkUrl){
        return res.status(404).json({error: 'Provided URL not found'})
      }

       checkUrl.totalClicks= (checkUrl.totalClicks || 0) + 1;
       if(checkUrl.ipAdd.indexOf(ip) === -1){
           checkUrl.uniqueUsers = 1
           checkUrl.ipAdd.push(ip)
       }

       if(checkUrl.clicksByDate.length === 0){
        let dateCountObj = {
              date: Date.now(),
              count: 1
        }
           checkUrl.clicksByDate.push(dateCountObj)
       }
      
       else if(checkUrl.clicksByDate.length > 0){
             
             let lastDate = checkUrl.clicksByDate[checkUrl.clicksByDate.length-1].date;
             let convertedDate = new Date(lastDate);
             let today = new Date();
             const isToday =
             convertedDate.getFullYear() === today.getFullYear() &&
             convertedDate.getMonth() === today.getMonth() &&
             convertedDate.getDate() === today.getDate();

             if(isToday){
                checkUrl.clicksByDate[checkUrl.clicksByDate.length-1].count+= 1;
             }else{
                let dateCountObj = {
                    date: Date.now,
                    count: 1
              }
                
              if( checkUrl.clicksByDate.length > 7){
                checkUrl.clicksByDate.unshift()
                checkUrl.clicksByDate.push(dateCountObj)
              }else{
                checkUrl.clicksByDate.push(dateCountObj)
              }
                
          
             }
            

       }

       let checkOsPresent = checkUrl.analytics.osType.findIndex(ele => ele.osName === uaDetails.os)

       if(checkOsPresent === -1){
            let osTypeObj = {
                osName: uaDetails.os,
                uniqueClicks: 1,
                uniqueUsers: 1

            }
            checkUrl.analytics.osType.push(osTypeObj)
       }else{
           let uniqueUserCheck = checkUrl.ipAdd.indexOf(ip) === -1
            uniqueUserCheck ? checkUrl.analytics.osType[checkOsPresent].uniqueUsers+= 1 : checkUrl.analytics.osType[checkOsPresent].uniqueClicks+= 1
       }


       let checkDevicePresent = checkUrl.analytics.deviceType.findIndex(ele => ele.deviceName === uaDetails.platform)

       if(checkDevicePresent === -1){
            let deviceTypeObj = {
                deviceName: uaDetails.platform,
                uniqueClicks: 1,
                uniqueUsers: 1

            }
            checkUrl.analytics.deviceType.push(deviceTypeObj)
       }else{
           let uniqueUserCheck = checkUrl.ipAdd.indexOf(ip) === -1
            uniqueUserCheck ? checkUrl.analytics.deviceType[checkDevicePresent].uniqueUsers+= 1 : checkUrl.analytics.deviceType[checkDevicePresent].uniqueClicks+= 1
       }

       let geoLocationObj = {
           ip: geoData.ip,
           hostname: geoData.hostname,
           city: geoData.city,
           region: geoData.region,
           country: geoData.country,
           postal: geoData.postal,
           location: geoData.loc
       }

        checkUrl.analytics.geoLocation.push(geoLocationObj)
 
         await checkUrl.save();
 

         res.redirect(checkUrl.longUrl)
      
    } catch (error) {
        console.log(`error in redirect controller`,error)
      res.status(500).json({ error: 'Internal server error.. something went wrong' });
    }

}