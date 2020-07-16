const model = require('../../database/models/pgModels.js')

const getSongQuery = ((pInput, callback) => {
  console.log("TEST: ", pInput)
  model.Song.findAll({
    where: {
      song_id: pInput
    }
  })
  .then(data => callback(null, data))
  .catch(err => callback(err, null))
})

const getArtistQuery = ((pInput, callback) => {
  console.log("TEST: ", pInput)
  model.Artist.findAll({
    where: {
      artist_id: pInput
    }
  })
  .then(data => callback(null, data))
  .catch(err => callback(err, null))
})

const getAlbumQuery = ((pInput, callback) => {
  console.log("TEST: ", pInput)
  model.Album.findAll({
    where: {
      album_id: pInput
    }
  })
  .then(data => callback(null, data))
  .catch(err => callback(err, null))
})

// //gets the top 5 songs by listens
const getTopFive = function(artist) {
  var songs = model.Song.findAll({
    where: {
    artist_id: artist,
    },
  })
  console.log("SONGS: ", songs)
  return songs;
}

//get the album artwork
const getAlbumImage = function(id) {
  var query = model.Album.findAll({
    where: {
      album_id: id
    }
  });
  console.log(query)
  return query;
}

module.exports = {
  getSongQuery: getSongQuery,
  getAlbumQuery: getAlbumQuery,
  getArtistQuery: getArtistQuery,
  getTopFive: getTopFive,
  getAlbumImage: getAlbumImage,
}