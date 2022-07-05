const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes")

const app = express();
app.use(bodyParser.json());
app.use('/', routes);

const mongoose = require('mongoose');
//yhteys tietokantaan, tällä kertaa en tehnyt .env tiedosta koska viimeksi en saanut sitä githubissa piiloon
const mongoURL = 'mongodb+srv://tiia90:3heivaan4@cluster0.igutn.mongodb.net/moviedb?retryWrites=true&w=majority';
mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});