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

// //gets the top 5 songs by listens
const getTopFive = ((albumId, callback) => {
  model.Song.findAll({
    where: {
    album_id: albumId,
    },
  })
  .then(data => callback(null, data))
  .catch(err => callback(err, null))
})

module.exports = {
  getSongQuery: getSongQuery,
  getTopFive: getTopFive,
}