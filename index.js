const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config;

const uri =
  "mongodb+srv://ourDoctors:akash91221!!!@cluster0.ugsfy.mongodb.net/doctorsPortal?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get("/", (req, res) => {
  res.send("db it is working");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  console.log(err);
  const appointmentCollection = client
    .db("doctorsPortal")
    .collection("appointments");

  app.post("/addAppointment", (req, res) => {
    const appointment = req.body;
    console.log(appointment);
    appointmentCollection
      .insertOne(appointment)
      .then((result) => {
        res.send(result.insertedCount > 0);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.listen(process.env.PORT || port);
