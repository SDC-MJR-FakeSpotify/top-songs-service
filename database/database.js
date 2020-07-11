const { Sequelize, DataTypes, Models } = require('sequelize')
const sequelize = new Sequelize('spotify', 'postgres', 'password', {
  // host:'localhost:5432',
  dialect: 'postgres'
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
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.STRING,
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
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  artistId: {
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
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  albumId: {
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
});  //, {strict: false} from original model

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

const plantSeed = async function(pNum) {
 
  let songCount = 0;
  let albumCount = 0;
  let songsToCount = 0; Math.floor(Math.random() * (25 - 10 + 1)) + 10;
  let albumsToCount = 0;
  let artistCount = 0;
  let currentSongs = [];

  while (songCount < pNum) {
    await Artist.create({
      artist_id: artistCount + 1,
      name: fName,
      bio:  fBio,
      relatedArtists: () => {
        let tempVal = Math.floor(Math.random() * (10 - 5 + 1)) + 5
        let result = []
        for (let i = 0; i < tempVal; i++) {
          result.push(fName)
        }
        return result
      },
      imageUrl: fImageURL
    })
    .catch(err => console.log(err))
    albumsToCount = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    songsToCount = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    for (let i = 0; i < albumsToCount; i++) {
      let temp = 0;
      while (temp < songsToCount) {
        await Song.create({
          song_id: songCount + 1,
          title: 'title',
          artistId: artistCount + 1,
          albumId: albumCount + 1,
          featuredArtists: ['blah', 'blah', 'blah'],
          mp3: 'song.com/song',
          duration: Math.floor(Math.random() * (3 - 2 + 1)) + 3,
          listens: Math.floor(Math.random() * (200000 - 20000 + 1)) + 20000,
          explicit: false
        })
        .catch(err => console.log(err))
        currentSongs.push(songCount + 1)
        songCount = songCount + 1
        temp = temp + 1
      }
      await Album.create({
        album_id: albumCount + 1,
        title: "title",
        artistId: artistCount + 1,
        songs: currentSongs,
        featuredArtists: ["Robin", 'Marek'],
        type: 'Indy',
        imageUrl: 'imageUrl'
      })
      .catch(err => console.log(err))
      albumCount = albumCount + 1
    }
    artistCount = artistCount + 1
    currentSongs = []
  }
}

//uncomment to sync
//sequelize.sync({ force: true })
//plantSeed(10);

module.exports = {
  Artist: Artist,
  Album: Album,
  Song: Song,
  getTopFive: getTopFive,
  getAlbumImage: getAlbumImage
};
