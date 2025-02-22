const express = require("express");
const PlayerSchema = require("../models/playerModel.js");
const TeamsList = require("../constants/enumConstants.js");
const {URLConstants} = require('../constants/urlConstants.js')
const {cricbuzzAPIHelper} = require('../helpers/crircbuzzAPIHelper.js')

exports.CreatePlayer = async (req, res) => {
  try {
    const {
      playerName,
      countryName,
      isBatsman,
      isBowler,
      isWicketKeeper,
      isAllRounder,
      isCaptain,
      isViceCaptain,
    } = req.body;

    if (!playerName) {
      res.status(500).json({
        message: "PlayerName is empty.",
      });
    } else if (!TeamsList.includes(countryName)) {
      res.status(500).json({
        message: "Player must be from vaild country.",
      });
    } else if (isBatsman && isBowler) {
      res.status(500).json({
        message: "Player can either be batsman or bowler.",
      });
    }

    const playerData = await PlayerSchema.findOne({ playerName, countryName });
    console.log(playerData);
    if (playerData) {
      res.status(500).json({
        message: "Player already exists.",
      });
    }

    const player = PlayerSchema({
      playerName,
      countryName,
      isBatsman,
      isBowler,
      isWicketKeeper,
      isAllRounder,
      isCaptain,
      isViceCaptain,
    });

    output = await player.save();

    res.status(200).json({
      message: "Player Data successfully created.",
      player: output,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while player creation.",
      error,
      success: false,
    });
  }
};

exports.GetTrendingPlayerListController = async (req, res) => {
  try {
    let URL = URLConstants["GET_PLAYER_TRENDING_LIST"];

    let response = await cricbuzzAPIHelper(URL);
    res.status(200).json({
      message: "",
      response: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "",
      error: error,
    });
  }
};

exports.GetPlayerCareerController = async (req, res) => {
  try {
    const playerId = req.params.playerId;
    let URL = URLConstants["GET_PLAYER_CAREER_DETAILS"];

    let response = await cricbuzzAPIHelper(URL);
    res.status(200).json({
      message: "",
      response: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "",
      error: error,
    });
  }
};

exports.GetPlayerNewsController = async (req, res) => {
  try {
    const playerId = req.params.playerId;
    let URL = URLConstants["GET_PLAYER_NEWS"];

    let response = await cricbuzzAPIHelper(URL);
    res.status(200).json({
      message: "",
      response: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "",
      error: error,
    });
  }
};

exports.GetPlayerBowlingDetailsController = async (req, res) => {
  try {
    const playerId = req.params.playerId;
    let URL = URLConstants["GET_PLAYER_BOWLING_DETAILS"];

    let response = await cricbuzzAPIHelper(URL);
    res.status(200).json({
      message: "",
      response: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "",
      error: error,
    });
  }
};

exports.GetPlayerBattingDetailsController = async (req, res) => {
  try {
    const playerId = req.params.playerId;
    let URL = URLConstants["GET_PLAYER_BATTING_DETAILS"];

    let response = await cricbuzzAPIHelper(URL);
    res.status(200).json({
      message: "",
      response: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "",
      error: error,
    });
  }
};

exports.GetPlayerInfoDetailsController = async (req, res) => {
  try {
    const playerId = req.params.playerId;
    let URL = URLConstants["GET_PLAYER_INFO_DETAILS"];
URL = `${URL}${req.params.playerId}`
    let response = await cricbuzzAPIHelper(URL);
    res.status(200).json({
      message: "",
      response: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "",
      error: error,
    });
  }
};

exports.GetPlayerSearchController = async (req, res) => {
  try {
    const playerName = req.query.playerName;
    let URL = URLConstants["GET_PLAYER_SEARCH"];

    let response = await cricbuzzAPIHelper(URL);
    res.status(200).json({
      message: "",
      response: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "",
      error: error,
    });
  }
};
