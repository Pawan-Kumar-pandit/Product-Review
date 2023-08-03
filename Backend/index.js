const express = require("express");
const app = express();
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const path = require("path");
const Notify= require("./Routes/Notify")

app.use(cors());

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

// dotEnv Configuration
dotEnv.config({ path: "./.env" });

const port = process.env.PORT || 8000;

const mogodb = process.env.MONGO_DB_URL; 

mongoose.connect(mogodb, {useNewUrlParser:true,useUnifiedTopology:true}).then(()=>
    console.log("Db connceted")
).catch((err)=>{
console.log(err)

})




// router configuration
app.use("/api/users", require("./Routes/UserRoutes"));
app.use("/api/feedback", require("./Routes/Feedbackroutes"));

const server=app.listen(port, () => {
  console.log(`Express Server is Started at PORT : ${port}`);
});

const io = require('socket.io')(server ,{
  cors : {
      origin : ['http://localhost:3000'],
      methods : ["GET","POST"]
  }
});
Notify(io);




