const  express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.goylkt8.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const emplyeecollection = client.db('Allemplyee').collection('employee');
    const assetcollection = client.db('Allasset').collection('asset');
    const reqassetcollection = client.db('Reqasset').collection('assetreq');


// asset api 
app.get('/asset',async (req,res)=>{
  const result = await assetcollection.find().toArray();
  res.send(result)
})


// end
// employye api

app.get('/employee',async(req,res)=>{
  const result = await emplyeecollection.find().toArray()
  res.send(result)
})

app.get('/employee/:id', async(req,res)=>{
  const id = req.params.id;
  const query = {_id : new ObjectId(id)}
  const result = await emplyeecollection.findOne(query)
  res.send(result)
})


    app.post('/employee',async(req,res)=>{
      const user = req.body;
      const result = await emplyeecollection.insertOne(user)
      res.send(result)
    })

    app.patch('/employee/:id', async(req,res)=>{
      const item = req.body;
      const id = req.params.id;
      const filter = { _id : new ObjectId(id) }
      const updateddoc = {
        $set : {
          fullname : item.name,
          dateofbirth : item.birth
        }
      }
      const result = await emplyeecollection.updateOne(filter,updateddoc)
      res.send(result)
    })

    // end

    // req asset api

    app.post('/assetreq',async(req,res)=>{
      const item = req.body;
      console.log(item)
      const result = await reqassetcollection.insertOne(item)
      res.send(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',async(req,res)=>{
   res.send('assignment 12')
})

app.listen(port, ()=>{
    console.log(`coming from server ${port}`)
})