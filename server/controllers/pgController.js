const model = require('../../database/models/pgModels.js')

// //gets the top 5 songs by listens
const getSongs = ((albumId, callback) => {
  model.Song.findAll({
    where: {
    album_id: albumId,
    },
  })
  .then(data => callback(null, data))
  .catch(err => callback(err, null))
})

module.exports = {
  getSongs: getSongs,
}