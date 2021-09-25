const express = require('express');
const server = express();
const path = require('path')

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://conutik:conutik2006@socials.x9wyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const mongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongo.connect().then(() => {
  console.log("Connected to Database")
})

const result = mongo.db("messages").collection("messages");

server.get('/', (req, res) => {
  res.redirect('/events')
})

server.use(express.static(path.join(__dirname, 'functions')));

server.use(
  express.urlencoded({
    extended: true
  })
)

server.use(express.json())

server.use('/events', express.static(path.join(__dirname, './index.html')))


server.use("/invalid", express.static(path.join(__dirname, './invalid.html')))

server.post('/message', async (req, res) => {
  let data = req.body;
  await result.updateOne({ _id: "messages" }, { $push: { idk: req.body.msg } }, { upsert: true })
  res.send(JSON.stringify({
    status: "done"
  }))
})

server.post('/validate', async (req, res) => {
  let data = req.body.id;

  let ts = await result.findOne({ _id: data })
  if(!ts) return res.send(JSON.stringify({
    real: false
  }));
  res.send(ts)
})

server.use('/api', async (req, res) => {

  let data = await result.findOne({ _id: "messages" })

  if(!data) return res.send(JSON.stringify({data: []}));
  res.send(data)
})

server.listen(3000, () => { console.log("Server is Ready!") });

