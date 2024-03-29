//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js"); /**created module */

const app = express();
const port = process.env.PORT || 3000;

/**Set ejs */
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res){
    
    const day = date.getDate();
    
    res.render('list', {listTitle: day, newItems: items});

    /**All variables should be defined in get function*/
    /**If not -> error */
});

app.post("/", function(req, res){

    const item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req, res){
    res.render('list', {listTitle: "Work List", newItems: workItems});
});

app.listen(port, function(){
    console.log("Server is running on port " + port);
});