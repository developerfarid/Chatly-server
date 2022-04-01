

const express = require('express')
const app = express()
const cors = require("cors")
const ObjectId = require('mongodb').ObjectId;
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const secretPass = "SfrgiefeGefgMewtA";
const port = process.env.PORT || 7050
require("dotenv").config();
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))



app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://assinment12DB:vDI5amW3PqxDB8gV@cluster0.doqsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('chatly');
        const usersCollection = database.collection('users');
        const messageCollection = database.collection('message');
        const conversationCollection = database.collection('conversation');


        // user Account Created By user
        app.post("/user", async (req, res) => {
            const { displayName, photoURL, phone } = req.body;
            console.log(displayName, phone);
            const token = jwt.sign({ foo: 'bar' }, secretPass);
            console.log(token);
            const data = {
                displayName,
                photoURL,
                phone,
                token,
            };
            const user = await usersCollection.insertOne(data);
            console.log(user);
            res.send(user);

        });

        app.get("/user/:id", async (req, res) => {
            const id = req.params.id
            const result = await usersCollection.findOne({ _id: ObjectId(id) });
            res.send(result)
        })
        app.get("/userToken/:token", async (req, res) => {
            const token = req.params.token
            const result = await usersCollection.findOne({ token: token });
            console.log(result);
            res.send(result)
        })
        app.get("/allUser", async (req, res) => {
            const result = await usersCollection.find({}).toArray();
            console.log(result);
            res.send(result)
        })

        // Chat App
        app.post("/conversation", async (req, res) => {
            const aaa = {
                member: [req.body.member[0], req.body.member[1]],
            };
            const result = await conversationCollection.insertOne(aaa);
            res.send(result);
        });
        app.get("/conversation/:id", async (req, res) => {
            const result = await conversationCollection
                .find({
                    member: { $in: [req.params.id] },
                })
                .toArray();
            res.send(result);
        });
        app.get("/conversatio/:acc", async (req, res) => {
            const id = req.params.acc;
            const query = { _id: ObjectId(id) };
            const result = await conversationCollection.findOne(query);
            res.send(result);
        });
        app.delete("/conversationDelete/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await conversationCollection.deleteOne(query);
            res.send(result);
        });
        // online friend
        // message
        app.post("/messages", async (req, res) => {
            const aaa = {
                converssationId: req.body.converssationId,
                senderId: req.body.senderId,
                text: req.body.text,
                time: req.body.time,
            };
            const result = await messageCollection.insertOne(aaa);
            res.send(result);
        });

        app.get("/messages/:Id", async (req, res) => {
            const result = await messageCollection
                .find({ converssationId: req.params.Id })
                .toArray();
            res.send(result);
        });
        app.delete("/messageDelete/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await messageCollection.deleteOne(query);
            res.send(result);
        });

        app.get("/getUsers/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor = await usersCollection.findOne(query);
            res.send(cursor);
        });

     
      app.get("/onlineFridGet/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const cursor = await usersCollection.findOne(query);
        res.send(cursor);
      });
     
      app.delete("/messageDelete/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await messageCollection.deleteOne(query);
        res.send(result);
      });
      // message
      app.post("/messages", async (req, res) => {
        const aaa = {
          converssationId: req.body.converssationId,
          senderId: req.body.senderId,
          text: req.body.text,
          time: req.body.time,
        };
        const result = await messageCollection.insertOne(aaa);
        res.send(result);
      });
  
      app.get('/messages/:Id', async (req, res) => {
        const result = await messageCollection.find({ converssationId: req.params.Id }).toArray()
        res.send(result)
      })
  
  
    
  
   
      /*======================================================
                      Nurse Section Ends
      ========================================================*/
      /*======================================================
                      Medicine Section Starts
      ========================================================*/
      // post medicine api
      app.post("/medicine", async (req, res) => {
        const medicine = req.body;
        const result = await medicineCollection.insertOne(medicine);
        res.send(result);
      });
  
      // Medicine Api
      app.get("/medicine", async (req, res) => {
        const cursor = medicineCollection.find({});
        const result = await cursor.toArray();
        res.send(result);
      });
  
      /*======================================================
                    Chat Section starts
    ========================================================*/
      // Chat App
      app.post("/conversation", async (req, res) => {
        const aaa = {
          member: [req.body.member[0], req.body.member[1]],
        };
        const result = await converssationCollection.insertOne(aaa);
        res.send(result);
      });
      app.get("/conversation/:id", async (req, res) => {
        const result = await converssationCollection
          .find({
            member: { $in: [req.params.id] },
          })
          .toArray();
        res.send(result);
      });
   
      app.get("/conversatio/:acc", async (req, res) => {
        const id = req.params.acc;
        const query = { _id: ObjectId(id) };
        const result = await converssationCollection.findOne(query);
        res.send(result);
      });
      app.delete("/conversationDelete/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await converssationCollection.deleteOne(query);
        res.send(result);
      });
      app.delete("/messageDelete/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await messageCollection.deleteOne(query);
        res.send(result);
      });
      // message
      app.post("/messages", async (req, res) => {
        const aaa = {
          converssationId: req.body.converssationId,
          senderId: req.body.senderId,
          text: req.body.text,
          time: req.body.time,
        };
        const result = await messageCollection.insertOne(aaa);
        res.send(result);
      });
  
      app.get("/messages/:Id", async (req, res) => {
        const result = await messageCollection
          .find({ converssationId: req.params.Id })
          .toArray();
        res.send(result);
      });
  
      app.get("/users/:email", async (req, res) => {
        const cursor = userCollection.findOne({ email: req.params.email });
        const users = await cursor;
        res.send(users);
      });
      app.get("/getUsers/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const cursor = await userCollection.findOne(query);
        res.send(cursor);
      });
  
  


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))