const express = require("express");
const GameSchema = require("../models/gameModel.js");
const { CreateGameFromSeriesId } = require("../helpers/gameHelper.js");
const Series = require("../models/seriesModel.js");
const Owner = require("../models/ownerModel.js");

exports.CreateGame = async (req, res) => {
  try {
    var output = await CreateGameFromSeriesId(req.params.seriesId);

    var out = await GameSchema.insertMany(output);

    var series = await Series.findOne({ seriesId: req.params.seriesId });
    if (series.games.length == 0) {
      series.games = [out[0]._id];
    } else {
      series.games = [out[0]._id, ...series.games];
    }

    let aseries = await series.save();

    res.status(200).json({
      message: "CreateGame successful.",
      isSuccess: true,
      out,
      aseries,
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
    let url = `https://fantasy-app-chi.vercel.app/api/v1/game/join-game/${req.params.gameId}`;

    res.status(200).json({
      message: "InviteOwners successful.",
      isSuccess: true,
      url,
    });
  } catch (error) {
    res.status(500).json({
      message: "InviteOwners Failed.",
      error,
    });
  }
};

exports.JoinGame = async (req, res) => {
  try {
    var game = await GameSchema.findById(req.params.gameId);

    if (game.ownerId.includes(req.params.ownerId)) {
      res.status(500).json({
        message: "you have already joined the game",
      });
      return;
    }

    if (game.maximumOwners == game.ownerId.length) {
      let deleteOwner = await Owner.findByIdAndDelete(req.params.ownerId);
      res.status(200).json({
        message: "maximum owners have already been added in the game.",
        deleteOwner,
      });
      return;
    }

    var owner = await Owner.findById(req.params.ownerId).populate('ownerId');
    //console.log(owner)
    var owners = await Owner.find({ ownerTeamName: owner.ownerTeamName });
    console.log(owners.length);
    if (owners.length > 1) {
      let deleteOwner = await Owner.findByIdAndDelete(req.params.ownerId);
      res.status(200).json({
        message: "owner team name already exists for current game list.",
        deleteOwner,
      });
      return;
    }
    // console.log("hi");

    game.ownerId = [req.params.ownerId, ...game.ownerId];
    if (!game.users.includes(req.user._id))
      game.users = [req.user._id, ...game.users];
    // console.log(game);
    game.ownerPoints = {
      documentCode : owner.documentCode,
      ownerName : owner.ownerId.name,
      ownerTeamName : owner.ownerTeamName,
      pointsRemaining : game.maximumPoints
    }

    // console.log(owner);
    owner.games = req.params.gameId;
    owner.series = game.seriesDetails;
    owner.seriesId = game.seriesId;
    owner.totalEntryAmount = game.maximumMoneyGame;
    owner.maximumPoints = game.maximumPoints;
    // console.log(owner);

    var out = await game.save();
    var ownerss = await owner.save();

    res.status(200).json({
      message: "JoinGame successful.",
      isSuccess: true,
      out,
      ownerss,
    });
  } catch (error) {
    res.status(500).json({
      message: "JoinGame Failed.",
      error,
    });
  }
};

exports.UpdateMaximumOwnersCount = async (req, res, next) => {
  try {
    var game = await GameSchema.findById(req.params.gameId);
    game.maximumOwners = req.params.ownersCount;
    game.maximumPoints = req.params.maximumPoints;
    game.maximumMoneyGame = req.params.maximumMoneyGame;

    var out = await game.save();
    res.status(200).json({
      message: "UpdateMaximumOwnersCount successful.",
      isSuccess: true,
      out,
    });
  } catch (error) {
    res.status(500).json({
      message: "UpdateMaximumOwnersCount Failed.",
      error,
    });
  }
};

exports.GetAllGames = async (req, res) => {
  try {
    var game = await GameSchema.find().populate([
      "ownerId",
      "seriesDetails",
      "users",
    ]);

    res.status(200).json({
      message: "GetAllGames successful.",
      isSuccess: true,
      game,
    });
  } catch (error) {
    res.status(500).json({
      message: "GetAllGames Failed.",
      error,
    });
  }
};

exports.GetAllMyGames = async (req, res) => {
  try {
    var game = await GameSchema.find({
      users: { $in: [req.user._id] },
    }).populate(["ownerId", "seriesDetails", "users"]);

    res.status(200).json({
      message: "GetAllMyGames successful.",
      isSuccess: true,
      game,
    });
  } catch (error) {
    res.status(500).json({
      message: "GetAllMyGames Failed.",
      error,
    });
  }
};

exports.GetSingleGame = async (req, res) => {
  try {
    var game = await GameSchema.findById(req.params.gameId).populate([
      "ownerId",
      "seriesDetails",
      "users",
    ]);

    res.status(200).json({
      message: "GetSingleGame successful.",
      isSuccess: true,
      game,
    });
  } catch (error) {
    res.status(500).json({
      message: "GetSingleGame Failed.",
      error,
    });
  }
};
