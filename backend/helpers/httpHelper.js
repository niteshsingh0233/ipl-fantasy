const axios = require("axios");
const series = require("../models/seriesModel.js");
const game = require("../models/gameModel.js");
const users = require("../models/userModel.js");
const matches = require("../models/matchModel.js");
const venues = require("../models/venueModel.js")
const teams = require('../models/teamModel.js')
const players = require('../models/playerModel.js')

exports.GetAsync = async (url) => {
  try {
    const options = {
      method: "GET",
      url: url,
    };
    let response = await axios.request(options);
    return response;
  } catch (error) {}
};

exports.PostAsync = async (url, body) => {
  try {
    const options = {
      body,
      method: "POST",
      url: url,
    };
    let response = await axios.request(options);
    return response;
  } catch (error) {}
};

exports.DMHelper = async (entityName, searchKey, searchValue) => {
  try {
    if (entityName == "series") {
      let response = await series.findOne({ id: searchValue }).populate(['teams', 'venues', 'games', 'squadPlayers.players', 'matches'])
      //console.log(response);
      return response;
    } else if (entityName == "games") {
      let response = await game
        .find()
        .populate("seriesDetails")
        .populate("ownerId");
      console.log(response[0].ownerId[0].playingXIList);
      //.populate("seriesDetails");
      //console.log("response " + response);
    } else if (entityName == "users") {
      if (searchKey == undefined) {
        let response = await users.find();
        //console.log(response);
        return response;
      }
    } else if (entityName == "matches") {
      let response =[]
      let output = await matches
        .find({ seriesId: searchValue })
        
        output.forEach((element) => {
          response.push(element._id)
        });
        // console.log(response);
      return response;
    }else if (entityName == "venues") {
      let response =[]
      let output = await venues
        .find({ venueId: {$in :searchValue} })
        //console.log(output);
        output.forEach((element) => {
          response.push(element._id)
        });
        // console.log(response);
      return response;
    }else if (entityName == "teams") {
      let response =[]
      let output = await teams
        .find({ teamId: {$in :searchValue} })
        //console.log(output);
        output.forEach((element) => {
          response.push(element._id)
        });
        // console.log(response);
      return response;
    }else if (entityName == "players") {
      let response =[]
      let output = await players
        .find({ playerId: {$in :searchValue} })
        //console.log(output);
        output.forEach((element) => {
          response.push(element._id)
        });
        // console.log(response);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
