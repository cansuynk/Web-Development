//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request'); 

const port = 3000;
const app = express();




app.listen(port, function(req, res){
    console.log("Server is running on port " + port);
});
