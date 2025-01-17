const express = require("express");
require("dotenv").config();
const path = require('path')

const app = express();

const cors = require('cors')

const PORT = process.env.PORT || 5000;



const dbConnection = require("./utils/dbConnection");
const userAuth = require('./routes/auth.route');
const urlHandler = require('./routes/urlHandler.route');
const analyticsRoute = require('./routes/analytics.route')



app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(cors({
    origin:"*",
    credentials: true
}))

app.use('/api/auth/google',userAuth)

app.use('/api/shorten',urlHandler)

app.use('/api/analytics',analyticsRoute)


if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'../frontend/build')) )
  app.use('/',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'../frontend','build','index.html'))
  })
}

dbConnection()
  .then((resp) => {
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
