//jshint esversion:6

const mongoose = require('mongoose');

//Connect mongoDB server
const uri = "mongodb://localhost:27017";
const databaseName = "fruitsDB";

mongoose.connect(uri + "/" + databaseName, {useNewUrlParser: true});

//create new schema
//Add validaiton 
const fruitSchema = new mongoose.Schema({
    name:{ type: String, required: [true, "Please check your data entryi no name specified!"]},
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

//Create model
const Fruit = mongoose.model("Fruit", fruitSchema);

//Create document from model
const fruit = new Fruit ({
    rating: 10,
    review: "Pretty solid as a fruit."
});

//fruit.save();  //save collection inside db

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit ({
    name: "Pineapple",
    rating: 9,
    review: "Great fruit."
});

//pineapple.save();

const person = new Person ({
    name: "Amy",
    age: 12,
    favouriteFruit: pineapple
});

person.save();

const kiwi = new Fruit ({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit!"
});

const orange = new Fruit ({
    name: "Orange",
    rating: 4,
    review: "Too sour for me"
});

const banana = new Fruit ({
    name: "Banana",
    rating: 3,
    review: "Weird texture"
});

//insert an array
/*
Fruit.insertMany([kiwi, orange, banana], function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully saved all fruits to fruitsDB");
    }

});
*/
/*
//query
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }else{
        //mongoose.connection.close();
        setTimeout(function() { mongoose.connection.close();}, 1000);
        fruits.forEach(element => {
            console.log(element.name);
        });
        console.log(fruits);
    }
});
*/

/*
Fruit.updateOne({_id: "61844ebcdea2d76bbe0a7f3f"}, {name: "Peach"}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully updated document.");
    }
});
*/
/*
Fruit.deleteOne({_id: "61844eec857d6a615ca8c920"}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully deleted document.");
    }
});
*/

/*
Person.deleteMany({name: "Angela"}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully deleted from all documents.");
    }
});
*/


Person.updateOne({_name: "Angela"}, {favouriteFruit: kiwi}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully updated document.");
    }
});