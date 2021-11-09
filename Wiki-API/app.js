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

//in order not to write route repetatively, use express single route method

////////////////////Request targeting all articles.//////////////////////////
app.route("/articles")
    .get(function(req, res){
        //fetch all articles from db
        Article.find({}, function(err, foundArticles){
            if (!err){
                res.send(foundArticles)  //display it in the browser
            }else{
                res.send(err);
            }
        });
    })

    .post(function(req, res){
        //add new articles to db
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
    
        newArticle.save(function(err){
            if(!err){
                res.send("Successfully added a new article.");
            }else{
                res.send(err);
            }
        });
    })

    .delete(function(req, res){
        //delete all articles from db
        Article.deleteMany({}, function(err){
            if(!err){
                res.send("Successfully deleted all articles.");
            }else{
                res.send(err);
            }
        });
    });

    ////////////////////Request targeting specific article.//////////////////////////

    app.route("/articles/:articleTitle")
    
    .get(function(req, res){
        Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
            if(foundArticle){
                res.send(foundArticle);
            }else{
                res.send("No articles matching that title was found.");
            }
        });
    })
    
    .put(function(req, res){
        //update an article
        //put remove all data, and replace new data
        //if only content is given, title is removed. 
        //instead of doing this, use patch (just provided field will change).
        Article.replaceOne(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content}, function(err){
                if(!err){
                    res.send("Successfully updated article.");
                }
            });
    })

    .patch(function(req, res){
        Article.updateOne(
            //which field wanted to be changed is unknown.
            {title: req.params.articleTitle},
            {$set: req.body}, function(err){
                if(!err){
                    res.send("Successfully updated article.");
                }else{
                    res.send(err);
                }
            });
    })

    .delete(function(req, res){
        Article.deleteOne({title: req.params.articleTitle}, function(err){
            if(!err){
                res.send("Successfully deleted the article.");
            }else{
                res.send(err);
            }
        });
    });

let port = 3000;
app.listen(port, function(){
    console.log("Server started on port " + port);
});
