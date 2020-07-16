const mongoose = require('mongoose');
const model = require('../../database/models/mongoModels.js');

// //gets the top 5 songs by listens
const getTopFive = function(artist) {
  var songs = model.Song.find({ artist_id: artist }).lean();
  songs.sort({listens: 'desc'});
  songs.limit(5);
  return songs;
}

//get the album artwork
const getAlbumImage = function(id) {
  var query = model.Album.find({album_id: id});
  // var image = query.select('imageUrl');
  //console.log(image)
  return query;
}

const getSongQuery = (pInput, callback) => {
  model.Song.find({ song_id: pInput })
  .limit(5)
  .exec((err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
}

const getAlbumQuery = (pInput, callback) => {
  model.Album.find({ album_id: pInput })
  .exec((err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
}

const getArtistQuery = (pInput, callback) => {
  model.Artist.find({ artist_id: pInput })
  .exec((err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
}

module.exports = {
  getSongQuery: getSongQuery,
  getAlbumQuery: getAlbumQuery,
  getArtistQuery: getArtistQuery,
  getAlbumImage: getAlbumImage,
  getTopFive: getTopFive,
}

