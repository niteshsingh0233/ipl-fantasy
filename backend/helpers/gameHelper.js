const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const httpHelper = require('../helpers/httpHelper.js')
const series = require('../models/seriesModel.js')

exports.CreateGameFromSeriesId = async (seriesId) => {
//  let seriesData = await httpHelper.GetAsync(`https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-series-matches-list/${seriesId}`);
 //console.log(seriesData)
 let seriesDta = await httpHelper.DMHelper('series', 'id', seriesId)
//  console.log(seriesDta)

//  let gameData = await httpHelper.DMHelper('games', 'id', 'b4c12a37-e6ad-4add-be60-4c0a6738f888');
  let test =  {
    gameId : uuidv4(),
    seriesId : seriesId,
    seriesDetails : "67a7ba30532c22eb60a45438",//`${seriesDta._id}`,
    teamId : [12,23,434,545,656,767],
    ownerId : [],
    matchesId : [1,2,3,4,5,6],
    playersId : [51791, 9789],
    venueId : [485],
    pointsId : ['67a7c20ef3bba6da3034699c'],
    maximumOwners : 10,
  }
  //console.log(test)
  return test;
};