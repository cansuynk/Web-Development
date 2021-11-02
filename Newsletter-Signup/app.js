//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request'); 
const https = require('https');


/**Works both in heroku's system and our port */
const port = process.env.PORT || 3000;
const app = express();

/**to be able to use static files (css, images etc.) */
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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

    const apiKey = ""; //Enter your api key.
    //send mailchimp
    const jsonData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/" + listId;
    const options = {
        method: "POST",
        auth: "cnsynk:" + apiKey,
    }

    const request = https.request(url, options, function(response){
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
    
});

app.post("/failure", function(req, res){
    res.redirect("/");
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});


app.listen(port, function(req, res){
    console.log("Server is running on port " + port);
});
