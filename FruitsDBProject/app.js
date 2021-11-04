//jshint esversion:6

const mongoose = require('mongoose');

//Connect mongoDB server
const uri = "mongodb://localhost:27017";
const databaseName = "fruitsDB";

mongoose.connect(uri + "/" + databaseName, {useNewUrlParser: true});

//create new schema
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

//Create model
const Fruit = mongoose.model("Fruit", fruitSchema);

//Create document from model
const fruit = new Fruit ({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});

//fruit.save();  //save collection inside db

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
    name: "Angela",
    age: 35
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
Fruit.insertMany([kiwi, orange, banana], function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully saved all fruits to fruitsDB");
    }

});