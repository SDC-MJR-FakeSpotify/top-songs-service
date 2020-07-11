const seed = require('./dataSeed.js')
const { Sequelize, DataTypes, Models } = require('sequelize')
const sequelize = new Sequelize('spotify', 'postgres', 'password', {
  dialect: 'postgres',
})
const faker = require('faker')

try {
  sequelize.authenticate();
  console.log('Connection to PostgreSQL database has been established successfully...');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

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

//gets the top 5 songs by listens
const getTopFive = function() {
  var songs = Song.findAll({
    order: ['listens', 'DESC'],
    limit: 5
  });
  //songs.sort({listens: 'desc'});
  //
  //songs = getImages(songs);
  return songs;
}

// //get the album artwork
const getAlbumImage = function(id) {
  var query = Album.findOne({
    where: {album_id: id}
  });
  var image = query.select('imageUrl');
  //console.log(image)
  return query;
}

//uncomment to sync
//sequelize.sync()
//seed.generateSeed(10000000);

module.exports = {
  Artist: Artist,
  Album: Album,
  Song: Song,
  getTopFive: getTopFive,
  getAlbumImage: getAlbumImage
};



