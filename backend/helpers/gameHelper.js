const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const httpHelper = require("../helpers/httpHelper.js");
const series = require("../models/seriesModel.js");
const { randomUUID } = require("crypto");

exports.CreateGameFromSeriesId = async (seriesId) => {
  //  let seriesData = await httpHelper.GetAsync(`https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-series-matches-list/${seriesId}`);
  //console.log(seriesData)
  let seriesDta = await httpHelper.DMHelper("series", "id", seriesId);
  console.log(seriesDta);
  const unsoldPlayersList = [];
  const playersList = [];

  seriesDta.squadPlayers.forEach((element) => {
    element.players.forEach((ele) => {
      console.log(ele)
      unsoldPlayersList.push({
        playerId : ele.playerId,
        playerStyle : ele.playerRoleType.toUpperCase(),
        playerName : ele.playerName,
        player_id : ele._id,
        playerDocumentCode : ele.documentCode,
      })
      playersList.push({
        playerId : ele.playerId,
        soldFor : 0,
        soldTo : '',
        isSold : false,
        playingStyle : ele.playerRoleType.toUpperCase(),
        playerName : ele.playerName,
        player_id : ele._id,
        playerDocumentCode : ele.documentCode,

      })
    });
  });

  //  let gameData = await httpHelper.DMHelper('games', 'id', 'b4c12a37-e6ad-4add-be60-4c0a6738f888');
  let test = {
    gameId: randomUUID().toString("hex"), //uuidv4(),
    seriesId: seriesId,
    seriesDetails: `${seriesDta._id}`,
    ownerId: [],
    pointsId: [],
    maximumOwners: 0,
    maximumPoints: 0,
    maximumMoneyGame: 0,
    unsoldPlayersList: unsoldPlayersList,
    soldPlayerList: [],
    playersList: playersList,
    ownerPoints: [],
  };
  //console.log(test)
  return test;
};
