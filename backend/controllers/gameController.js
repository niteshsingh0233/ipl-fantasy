const express = require("express");
const GameSchema = require("../models/gameModel.js");
const {
  CreateGameFromSeriesId
} = require("../helpers/gameHelper.js");

exports.CreateGame = async (req, res) => {
  try {

    var output = await CreateGameFromSeriesId(req.params.seriesId)

    var out = await GameSchema.insertMany(output);

    res.status(200).json({
      message: "CreateGame successful.",
      isSuccess: true,
      out
    });
  } catch (error) {
    res.status(500).json({
      message: "CreateGame Failed.",
      error,
    });
  }
};

exports.InviteOwners = async (req, res) => {
    try {
  
      var output = await CreateGameFromSeriesId(req.params.seriesId)
  
      var out = await GameSchema.insertMany(output);
  
      res.status(200).json({
        message: "CreateGame successful.",
        isSuccess: true,
        out
      });
    } catch (error) {
      res.status(500).json({
        message: "CreateGame Failed.",
        error,
      });
    }
};

exports.JoinGame = async (req, res) => {
    try {
  
        var game = await GameSchema.findById(req.params.gameId)
  
        if(game.ownerId.includes('67a7da92396dff3fab4cc4d4')){
            res.status(500).json({
                message : 'you have already joined the game'
            })
            return
        }
        game.ownerId = ['67a7da92396dff3fab4cc4d4', ...game.ownerId]
      var out = await GameSchema.updateOne(game);
  
      res.status(200).json({
        message: "JoinGame successful.",
        isSuccess: true,
        out
      });
    } catch (error) {
      res.status(500).json({
        message: "JoinGame Failed.",
        error,
      });
    }
};