const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d18ofon.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const portfolioDataCollection = client.db("risGen").collection("portfolioData");

    app.get('/alldata', async(req, res) => {
        const result = await portfolioDataCollection.find({}).toArray();
        res.send(result);
    })

    app.get('/alldata/graphics', async(req, res) => {
        const query = {category: 'Graphics'};
        const result = await portfolioDataCollection.find(query).toArray();
        res.send(result);
    })
    app.get('/alldata/video', async(req, res) => {
        const query = {category: 'Video'};
        const result = await portfolioDataCollection.find(query).toArray();
        res.send(result);
    })
    app.get('/alldata/web', async(req, res) => {
        const query = {category: 'Web'};
        const result = await portfolioDataCollection.find(query).toArray();
        res.send(result);
    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('risGen is running...')
})

app.listen(port, () => {
    console.log(`risGen is running on port ${port}`);
})