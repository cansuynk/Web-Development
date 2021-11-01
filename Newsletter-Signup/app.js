//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request'); 
const https = require('https');
//const mailchimp = require("@mailchimp/mailchimp_marketing");

const port = 3000;
const app = express();

/**to be able to use static files (css, images etc.) */
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//mailchimp.setConfig({apiKey: "471944d3711b25f9444e1bd872df39cf-us5",  server: "us5"});

app.post("/", function(req, res){
    const firstName = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const listId = "0b3744e325";

    const data = {
        members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName
            }
        }
      ]
    };

    //send mailchimp
    const jsonData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/" + listId;
    const options = {
        method: "POST",
        auth: "cnsynk:471944d3711b25f9444e1bd872df39cf-us5",
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
    
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});


app.listen(port, function(req, res){
    console.log("Server is running on port " + port);
});
