const bodyParser=require('body-parser');
const cors=require('cors');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

var mysql = require('mysql');
 
// create a connection variable with the required details
var con = mysql.createConnection({
  host: "evdata.cyevguizbdlg.us-east-2.rds.amazonaws.com", // ip address of server running mysql
  user: "CS790", // user name to your mysql database
  password: "e9n4PLa7X9TvN6gX4E95", // corresponding password
  database: "evloco" // use the specified database
});

 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
 console.log('connection successful');
});



app.post('/:zipcode', (req,res) => {
  res.set('Access-Control-Allow-Origin', '*');
  //SELECT latitude, longitude, street_address, city, state, zip, country FROM evloco.CarData;
  
  con.query("Select latitude, longitude, street_address, city, state, zip, country from evloco.CarData where zip= "+req.params.zipcode+" ;",
    [req.params.Zipcode],  function(err,dbRes){
      if(err){
        console.log(err);
        throw(err);
      }
      res.send(dbRes);
    });
})

app.listen(3001,()=>{
  console.log("Port 3001");
})