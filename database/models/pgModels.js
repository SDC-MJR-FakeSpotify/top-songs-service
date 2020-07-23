const { Sequelize, DataTypes, Models } = require('sequelize');
const sequelize = require('../postgresConfig.js');

const Song = sequelize.define('songs', {
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
    allowNull: false
  },
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  featuredArtists: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
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
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = {
  Song: Song
}