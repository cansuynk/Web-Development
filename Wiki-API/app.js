//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
//in order to parse our requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function(req, res){
    Article.find({}, function(err, foundArticles){
        if (!err){
            res.send(foundArticles)  //display it in the browser
        }else{
            res.send(err);
        }
    });
});

let port = 3000;
app.listen(port, function(){
    console.log("Server started on port " + port);
});