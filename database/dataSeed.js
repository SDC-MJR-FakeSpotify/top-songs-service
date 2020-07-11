const faker = require('faker')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriterArtists = createCsvWriter({
    path: './artists.csv',
    header: [
      {id: 'artist_id', title: 'artist_id'},
      {id: 'name', title: 'name'},
      {id: 'bio', title: 'bio'},
      {id: 'relatedArtists', title: 'relatedArtists'},
      {id: 'imageUrl', title: 'imageUrl'}
    ]
});

const csvWriterAlbums = createCsvWriter({
  path: './albums.csv',
  header: [
      {id: 'album_id', title: 'album_id'},
      {id: 'title', title: 'title'},
      {id: 'artist_id', title: 'artist_id'},
      {id: 'songs', title: 'songs'},
      {id: 'featuredArtists', title: 'featuredArtists'},
      {id: 'type', title: 'type'},
      {id: 'imageUrl', title: 'imageUrl'}
  ]
});

const csvWriterSongs = createCsvWriter({
  path: './songs.csv',
  header: [
      {id: 'song_id', title: 'song_id'},
      {id: 'title', title: 'title'},
      {id: 'artist_id', title: 'artist_id'},
      {id: 'album_id', title: 'album_id'},
      {id: 'featuredArtists', title: 'featuredArtists'},
      {id: 'mp3', title: 'mp3'},
      {id: 'duration', title: 'duration'},
      {id: 'listens', title: 'listens'},
      {id: 'explicit', title: 'explicit'}
  ]
});

const generateNames = () => {
  let randomNames = []
  let nameCount = Math.floor(Math.random() * (10 - 5 + 1)) + 5
  for (let i = 0; i < nameCount; i++) {
    randomNames.push(faker.name.firstName())
  }
  return randomNames
}

const generateGenre = () => {
  let genre = ['Indy', 'Electronic', 'Rock', 'Rap', 'Hip hop', 'Techno', 'Country', 'Pop', 'Punk']
  return genre[Math.floor(Math.random * 9)]
}

const generateSeed = async function(pNum) {

  let artistCount = 60090;
  let songCount = 9000168;
  let albumCount = 359959;
  let songsToCount = 0; Math.floor(Math.random() * (25 - 10 + 1)) + 10;
  let albumsToCount = 0;
  let albumSongs = [];
  let artists = []
  let albums = []
  let songs = []

  while (songCount < pNum) {

    let artistId = artistCount + 1

    //artist generation; 1x artist to many albums && 1x artist to many songs
    let randomRelated = generateNames()
    const artistRecord = {
      artist_id: artistId,
      name: faker.name.firstName(),
      bio:  faker.lorem.sentence(),
      relatedArtists: "{"+randomRelated+"}",
      imageUrl: faker.image.imageUrl()
    }
    artists.push(artistRecord)

    //song generation; many songs to 1x album && many songs to 1x artist
    albumsToCount = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    for (let i = 0; i < albumsToCount; i++) {
      let albumId = albumCount + 1
      songsToCount = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
      let temp = 0;
      let randomFeatured = generateNames()
      while (temp < songsToCount) {
        let songId = songCount + 1
        const songRecord = {
          song_id: songId,
          title: faker.lorem.words(),
          artist_id: artistId,
          album_id: albumId,
          featuredArtists: "{"+randomFeatured+"}",
          mp3: faker.internet.url(),
          duration: faker.random.number(),
          listens: faker.random.number(),
          explicit: faker.random.boolean()
        }
        songs.push(songRecord)
        albumSongs.push(songCount + 1)
        songCount = songCount + 1
        temp = temp + 1
      }

      //album generation; 1x album to 1x artist && 1x album to many songs
      let genre = generateGenre()
      randomFeatured = generateNames()
      const albumRecord = {
        album_id: albumCount,
        title: faker.lorem.words(),
        artist_id: artistCount + 1,
        songs: "{"+albumSongs+"}",
        featuredArtists: "{"+randomFeatured+"}",
        type: genre,
        imageUrl: faker.image.imageUrl()
      }
      albums.push(albumRecord)
      albumCount = albumCount + 1
      albumSongs = []
    }
    artistCount = artistCount + 1

  }
  //write files to .csv
  await csvWriterArtists.writeRecords(artists)
  .then(() => {console.log(`${artistCount + 1} Artists generated...`)})
  .catch(err => console.log(err))

  await csvWriterSongs.writeRecords(songs)
  .then(() => {console.log(`${songCount + 1} Songs generated...`)})
  .catch(err => console.log(err))

  await csvWriterAlbums.writeRecords(albums)
  .then(() => {console.log(`${albumCount + 1} Albums generated...`)})
  .catch(err => console.log(err))
}

module.exports.generateSeed = generateSeed






