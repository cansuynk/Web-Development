//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require("lodash");

const app = express();


/**Set ejs */
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//database name
const databaseName = "todoListDB";
//create new database
mongoose.connect("mongodb+srv://admin-cansu:test123@cluster0.v0vla.mongodb.net/" + databaseName, {useNewUrlParser: true});


//create schema
const itemsSchema = {
    name: String
};

//create mongoose model based on schema
//first parameter should be singular collection name, second = schema
const Item = mongoose.model("Item", itemsSchema);

//create new items

const item1 = new Item ({
    name: "Welcome to your todo list!"
});

const item2 = new Item ({
    name: "Hit the + button to add a new item."
});

const item3 = new Item ({
    name: "<= Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];


//list schema

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

//route home
app.get("/", function(req, res){

    Item.find({}, function(err, foundItems){
    
        if (foundItems.length === 0){
            /*If collection item is empty, insert default items */
            Item.insertMany(defaultItems, function(err){
                if (err){
                    console.log(err);
                }else{
                    console.log("Successfully saved default items to DB");
                }
            });
            res.redirect("/");
        }else{
            res.render('list', {listTitle: "Today", newItems: foundItems});
        }
    });
});

app.post("/", function(req, res){

    const itemName = req.body.newItem;
    const listName = req.body.list;

    //create new item document
    const item = new Item({
        name: itemName
    });
    
    if (listName === "Today"){
        item.save(); //short-cut of insertOne
        res.redirect("/");
    } else{
        List.findOne({name: listName}, function(err, foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }

});


//route delete
app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today"){
        Item.findByIdAndRemove(checkedItemId, function(err){
            if (err){
                console.log(err);
            }else{
                console.log("Successfully deleted checked item.");
                res.redirect("/");
            }
        });
    }else{
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
            if(!err){
                res.redirect("/" + listName);
            }
        });
    }

});


//route custom list name 
app.get("/:customListName", function(req, res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundList){
        if(!err){
            if(!foundList){
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
            
                list.save();
                res.redirect("/" + customListName);
            }else{
                res.render("list", {listTitle: foundList.name, newItems: foundList.items});
            }
        }
    });
    

});

//const port = process.env.PORT || 3000;
let port = process.env.PORT;
if (port === null || port === ""){
    port = 3000;
}

app.listen(port, function(){
    console.log("Server has started succesfully");
});