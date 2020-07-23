require('newrelic')
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
const path = require('path');

require('../database/postgresConfig.js');
const pgController = require('./controllers/pgController.js');
const model = require('../database/models/pgModels.js');

app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

// app.get('/loaderio-94b4a5d6f30dd8dfe86b1710f9400d1b.txt', (req, res) => {
//   res.send('loaderio-94b4a5d6f30dd8dfe86b1710f9400d1b')
// })

//route for testing
app.get('/getSongs', (req, res) => {
  //rand based off of artist ids
  //let rand = Math.floor(Math.random() * (588284 - 0) + 0)
  pgController.getSongs(200000, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
  // model.Song.findAll({
  //   where: {
  //     album_id: 200000,
  //   },
  // })
  // .then(songs => res.send(songs))
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

