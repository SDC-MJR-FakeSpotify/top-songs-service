const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  artist_id: Number,
  name: String,
  bio: String,
  relatedArtists: { type: Array, default: [] },
  imageUrl: String,
});
const Artist = mongoose.model('artists', artistSchema);

const albumSchema = new mongoose.Schema({
  album_id: Number,
  title: String,
  artist_id: String,
  songs: { type: Array, default: [] },
  featuredArtists: { type: Array, default: [] },
  type: String,
  imageUrl: String,
});
const Album = mongoose.model('albums', albumSchema);

const songSchema = new mongoose.Schema({
  song_id: Number,
  title: String,
  artist_id: Number,
  album_id: Number,
  featuredArtists: { type: Array, default: [] },
  mp3: String,
  duration: Number, // in seconds
  listens: Number,
  explicit: Boolean
}, {strict: false});
const Song = mongoose.model('songs', songSchema);

module.exports = {
  Artist: Artist,
  Album: Album,
  Song: Song
}