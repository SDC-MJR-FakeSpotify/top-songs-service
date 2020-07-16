const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');
const morgan = require('morgan');

require('../database/postgresConfig.js');
const pgController = require('./controllers/pgController.js');
const seed = require('../database/mockData/dataSeed.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "../public")));
app.use(morgan('dev'));

//generate csv files for data seeding. Implement in steps of 3 million songs
app.post('/data-generation', (req, res) => {
  seed.generateSeed(10000000);
  res.send('Data generated...');
})

//pg routes for benchmarking
app.get('/pg/artists', (req, res) => {
  let rand = Math.floor(Math.random() * (66737- 48000) + 48000)
  pgController.getArtistQuery(rand, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.json(data)
    }
  })
})

app.get('/pg/albums', (req, res) => {
  let rand = Math.floor(Math.random() * (400008 - 300000) + 300000)
  pgController.getAlbumQuery(rand, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.json(data)
      res.end()
    }
  })
})

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

app.get('/pg/top-songs', (req, res) => {
  console.log(`GET received for top 5 songs...`);
  //rand based off of artist ids
  let rand = Math.floor(Math.random() * (16000 - 0) + 0)
  pgController.getTopFive(rand)
    .then((songs) => {
      console.log('SONGS: ', songs)
      res.send(songs)
      const imageQueries = songs.map((song) => {
      //   //return the query for the album art
        return pgController.getAlbumImage(song.album_id)
      })
      Promise.all(imageQueries)
        .then((albums) => {
          //iterate through albums
          for (var i = 0; i < albums.length; i++) {
            //create a key in each song to reference the album art
            songs[i].image = albums[i].imageUrl
          }
          //once for loop ends, send back all the songs
          res.send(songs)
        })
    })
    .catch((err) => console.log(err))
})

// Get function to initially work through returning an image url by song
// app.get('/songs/addImage', (req, res) => {
//   // console.log('I got a get from: ', req.params.AlbumId);.
//   db.getSong(req.params.SongId)
//     .then((data) => {
//       res.send(data)
//     })
//     .catch(err => console.log(err))
// })

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT: ${PORT}`);
})

module.exports = app