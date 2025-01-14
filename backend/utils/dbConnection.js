const mongoose = require('mongoose');



async function connectToDB(){
   
    try{
       return await mongoose.connect(`mongodb+srv://vignvick3005:${process.env.DB_PASSWORD}@clustersharpener.ru5nn.mongodb.net/urlshortener?retryWrites=true&w=majority&appName=ClusterSharpener`)
    }catch(err){
        console.log(err)
         process.exit(1)
    }
}

module.exports = connectToDB;