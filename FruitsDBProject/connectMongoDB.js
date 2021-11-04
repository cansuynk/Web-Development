//jshint esversion:6

const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";;

const client = new MongoClient(uri, {useUnifiedTopology: true});

async function run() {
  try {
      //The 'await' should only be necessary if the async function was called. 
    await client.connect();
    console.log("Connected Successfully to server");

    //database name
    const database = client.db('fruitsDB');

    //collection name
    const fruitsCollection  = database.collection('fruits');
    
    // create an array of documents to insert
    const docs = [
        { name: "Apple", score: 8, review: "Great fruit" },
        { name: "Orange", score: 6, review: "Kinda sour" },
        { name: "Banana", score: 9, review: "Great stuff!" }
    ];
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await fruitsCollection.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
    
    //query
    const cursor = fruitsCollection.find({});
    
    //it's expecting a promise/callback, and needs the 'await' keyword to wait before it finds that query.
    if ((await cursor.count()) === 0) {
        console.log("No documents found!");
    }

    await cursor.forEach((fruit) => {
        console.log(fruit);
    });
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);