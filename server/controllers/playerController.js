const express = require("express");
const PlayerSchema = require("../models/playerModel.js");
const TeamsList = require("../constants/enumConstants.js");

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
