const axios = require("axios");

exports.CreateGameFromSeriesId = async (seriesId) => {
  return {
    gameId : 1,
    seriesId : seriesId,
    teamId : [12,23,434,545,656,767],
    ownerId : ['67a7bed543d484409e22085d', '67a7bd1ed141af532afb2e76'],
    matchesId : [1,2,3,4,5,6],
    playersId : [51791, 9789],
    venueId : [485],
    pointsId : ['67a7c20ef3bba6da3034699c'],
    maximumOwners : 10,
  }
};