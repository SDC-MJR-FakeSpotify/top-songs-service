require('newrelic')
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');
const morgan = require('morgan');

require('../database/postgresConfig.js');
const pgController = require('./controllers/pgController.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "../public")));
// app.use(morgan('dev'));

// app.get('/loaderio-94b4a5d6f30dd8dfe86b1710f9400d1b.txt', (req, res) => {
//   res.send('loaderio-94b4a5d6f30dd8dfe86b1710f9400d1b')
// })

//route for testing
app.get('/getSongs', (req, res) => {
  //rand based off of artist ids
  // let rand = Math.floor(Math.random() * (588284 - 0) + 0) //albums
  pgController.getSongs(200000, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

app.get('/:albumId', (req, res) => {
  //rand based off of artist ids
  // let rand = Math.floor(Math.random() * (588284 - 0) + 0) //albums
  pgController.getSongs(req.params.albumId, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT: ${PORT}`);
})

module.exports = app