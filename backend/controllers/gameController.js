const express = require("express");
const GameSchema = require("../models/gameModel.js");
const { CreateGameFromSeriesId, CreatePlayerCountryAndLeagueDetails } = require("../helpers/gameHelper.js");
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
      let deleteOwner = await Owner.findByIdAndDelete(req.params.ownerId);
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
      {game.users = [req.user._id, ...game.users];}
    // console.log(game);
    game.ownerPoints.push({
      documentCode : owner.documentCode,
      ownerName : owner.ownerId.name,
      ownerTeamName : owner.ownerTeamName,
      pointsRemaining : game.maximumPoints
    })

    // console.log(owner);
    owner.games = req.params.gameId;
    owner.series = game.seriesDetails;
    owner.seriesId = game.seriesId;
    owner.totalEntryAmount = game.maximumMoneyGame;
    owner.maximumPoints = game.maximumPoints;
    owner.pointsLeft = game.maximumPoints;
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
    console.log(req.body.notForeignTeamList)
    game.notForeignTeamList = req.body.notForeignTeamList
    game.gameName = req.body.gameName


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

exports.UpdateplayerCountryAndLeagueDetails = async  (req,res) => {
  try {
    var game = await GameSchema.findById(req.params.gameId)

    game.playerCountryAndLeagueDetails = await CreatePlayerCountryAndLeagueDetails(game.playersList)

    await game.save()

    res.status(200).json({
      message: "UpdateplayerCountryAndLeagueDetails successful.",
      isSuccess: true,
      game,
    });
  } catch (error) {
    res.status(500).json({
      message: "UpdateplayerCountryAndLeagueDetails Failed.",
      error : error.message,
    });
  }
}

exports.CreateGameUsingFile = async (req,res) => {
  try{

    res.status(200).json({
      message: "UpdateplayerCountryAndLeagueDetails successful.",
      isSuccess: true,
    });
  }catch(error){
    res.status(500).json({
      message: "CreateGameUsingFile Failed.",
      error : error.message,
    });
  }
}

exports.UpdateGameForRules = async (req,res) => {
  try
  {
    const gameId = req.params.gameId
    const {maxBowlerCountInPlayingXI, maxBatsmanCountInPlayingXI, maxAllRounderCountInPlayingXI, maxWicketKeeperCountInPlayingXI,maxPlayerSwapCount, maxCaptainSwapCount, maxViceCaptainSwapCount, maxForeignPlayerCountInPlayingXI, maxIndianPlayerCountInPlayingXI,
      minBowlerCountInPlayingXI, minBatsmanCountInPlayingXI, minAllRounderCountInPlayingXI, minWicketKeeperCountInPlayingXI, minIndianPlayerCountInPlayingXI
    } = req.body
    const game = await GameSchema.findById(gameId)

    game.gameRules.maxBowlerCountInPlayingXI = maxBowlerCountInPlayingXI
    game.gameRules.maxBatsmanCountInPlayingXI = maxBatsmanCountInPlayingXI
    game.gameRules.maxAllRounderCountInPlayingXI = maxAllRounderCountInPlayingXI
    game.gameRules.maxWicketKeeperCountInPlayingXI = maxWicketKeeperCountInPlayingXI
    game.gameRules.maxPlayerSwapCount = maxPlayerSwapCount
    game.gameRules.maxCaptainSwapCount = maxCaptainSwapCount
    game.gameRules.maxViceCaptainSwapCount = maxViceCaptainSwapCount
    game.gameRules.maxForeignPlayerCountInPlayingXI = maxForeignPlayerCountInPlayingXI
    game.gameRules.maxIndianPlayerCountInPlayingXI = maxIndianPlayerCountInPlayingXI
    game.gameRules.minBowlerCountInPlayingXI = minBowlerCountInPlayingXI
    game.gameRules.minBatsmanCountInPlayingXI = minBatsmanCountInPlayingXI
    game.gameRules.minAllRounderCountInPlayingXI = minAllRounderCountInPlayingXI
    game.gameRules.minWicketKeeperCountInPlayingXI = minWicketKeeperCountInPlayingXI
    game.gameRules.minIndianPlayerCountInPlayingXI = minIndianPlayerCountInPlayingXI

    await game.save()
    res.status(200).json({
      message: "UpdateGameForRules successful.",
      isSuccess: true,
      game,
    });

  }catch(error){
    res.status(500).json({
      message: "UpdateGameForRules Failed.",
      error : error.message,
      success : false
    });
  }
}

exports.UpdateAllowedPlayerType = async (req,res) => {
  try
  {
    const gameId = req.params.gameId
    const {allowedPlayerTypeForWk, allowedPlayerTypeForBatsman, allowedPlayerTypeForBowler, allowedPlayerTypeForAllRounder} = req.body
    const game = await GameSchema.findById(gameId)

    game.allowedPlayerTypeForSwap.allowedPlayerTypeForWk = allowedPlayerTypeForWk
    game.allowedPlayerTypeForSwap.allowedPlayerTypeForBatsman = allowedPlayerTypeForBatsman
    game.allowedPlayerTypeForSwap.allowedPlayerTypeForBowler = allowedPlayerTypeForBowler
    game.allowedPlayerTypeForSwap.allowedPlayerTypeForAllRounder = allowedPlayerTypeForAllRounder 

    await game.save()
    res.status(200).json({
      message: "UpdateAllowedPlayerType successful.",
      isSuccess: true,
      game,
    });

  }catch(error){
    res.status(500).json({
      message: "UpdateAllowedPlayerType Failed.",
      error : error.message,
      success : false
    });
  }
}