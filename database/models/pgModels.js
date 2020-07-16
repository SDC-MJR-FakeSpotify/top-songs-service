const { Sequelize, DataTypes, Models } = require('sequelize');
const sequelize = require('../postgresConfig.js');

const Artist = sequelize.define('artist', {
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  relatedArtists: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  }
})

console.log("Artist model configured: ", Artist === sequelize.models.Artist);

const Album = sequelize.define('album', {
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  songs: {
    type: DataTypes.ARRAY(DataTypes.STRING), // may need to setup default empty array
    allowNull: false,
  },
  featuredArtists: {
    type: DataTypes.ARRAY(DataTypes.STRING), // may need to setup default empty array
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
});

console.log("Album model configured: ", Album === sequelize.models.Album);

const Song = sequelize.define('song', {
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  featuredArtists: {
    type: DataTypes.ARRAY(DataTypes.STRING), // may need to setup default empty array
    allowNull: false,
  },
  mp3: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }, // in seconds
  listens: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  explicit: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

console.log("Song model configured: ", Song === sequelize.models.Song);

module.exports = {
  Artist: Artist,
  Album: Album,
  Song: Song
}