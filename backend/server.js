const express = require("express");
require("dotenv").config();
const app = express();


const dbConnection = require("./utils/dbConnection");

const PORT = process.env.PORT || 5000;


dbConnection()
  .then((resp) => {
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
