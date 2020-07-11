const Express = require('express');
const app = Express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(Express.static(path.join(__dirname, "../public")));

const db = require('../database/database.js');

// gets the top five songs by listens
app.get('/songs', (req, res) => {
  console.log('I got a get for top 5');
  db.getTopFive()
    .then((songs) => {
      console.log(songs)
      //console.log('I got the images back', data)
      const imageQueries = songs.map((song) => {
        //return the query for the album art
        return db.getAlbumImage(song.albumId)
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


app.listen(PORT, (req, res) => {
  console.log(`I am listening on ${PORT}`);
})

module.exports = app