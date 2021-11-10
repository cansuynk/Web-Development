//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');


const homeStartingContent = "Welcome! In this website, you can write and publish a post. Just click \"Add New Content\" button!";
const aboutContent = "Hello everyone! Welcome! My name is Cansu. I am computer engineer. I am currently improving myself in the full stack web development field. I like books, movies, drinking coffee, music, travelling and so on. Also I am a cat mother 😻. You can share your posts, writings or texts. Thank you for visiting :)";
const contactContent = "You can contact with me via these addresses.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//database connection
const databaseName = "blogDB"
const uri = "mongodb+srv://admin-cansu:test123@cluster0.v0vla.mongodb.net/"
mongoose.connect(uri + databaseName, {useNewUrlParser: true})

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

/**Home Page */
app.get("/", function(req, res){
  
  Post.find({}, function(err, posts){
    res.render('home', { 
      Content: homeStartingContent, 
      posts: posts });
  });
  
});


/**About Page */
app.get("/about", function(req, res){
  res.render('about', {Content: aboutContent});
});


/**Contact Page */
app.get("/contact", function(req, res){
  res.render('contact', {Content: contactContent});
});


/**Compose Page */
app.get("/compose", function(req, res){
  res.render('compose');
});

app.post("/compose", function(req,res){
  
  const post = new Post({
    title: req.body.composeTitle,
    content: req.body.composeBody
  });

  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});


/**Posts Pages */
app.get("/posts/:postId", function(req, res){

  const postId = req.params.postId;
  
  Post.findOne({_id: postId}, function(err, post){
   
    res.render("post", {
      Title: post.title, 
      Content: post.content});
  });

  /*
  posts.forEach(element => {
    if( _.lowerCase(element.title) === _.lowerCase()){
      res.render("post", 
      {
        Title: element.title,
        Content: element.content
      });
    }
  });
  */

});

let port = process.env.PORT;
if (port === null || port === ""){
    port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port " + port);
});
