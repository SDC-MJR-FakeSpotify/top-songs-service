// require('newrelic')
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');
const morgan = require('morgan');

require('../database/postgresConfig.js');
const pgController = require('./controllers/pgController.js');
// const seed = require('../database/mockData/dataSeed.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "../public")));
app.use(morgan('dev'));

//generate csv files for data seeding. Implement in steps of 3 million songs
// app.post('/data-generation', (req, res) => {
//   seed.generateSeed(10000000);
//   res.send('Data generated...');
// })

app.get('/pg/songs', (req, res) => {
  let rand = Math.floor(Math.random() * (10000000- 7500000) + 7500000)
  console.log(rand)
  pgController.getSongQuery(rand, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

app.get('/getSongs', (req, res) => {
  //rand based off of artist ids
  let rand = Math.floor(Math.random() * (588284 - 0) + 0) //albums
  // let rand = Math.floor(Math.random() * (66737- 48000) + 48000)
  pgController.getTopFive(rand, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT: ${PORT}`);
})

module.exports = app