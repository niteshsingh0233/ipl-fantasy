const express = require("express");
const PointSchema = require("../models/pointModel.js");
const GameSchema = require("../models/gameModel.js");
const OwnerSchema = require("../models/ownerModel.js");
const MatchSchema = require("../models/matchModel.js");
const {
  GetMatchScore,
  calculatePlayerPoints,
  GetMatchScoreV2,
  calculatePlayerPointsV2,
  GetMatchScoreForCalculateMatchPoints, 
  CalculateMatchPointsForOwners
} = require("../helpers/pointHelper.js");

exports.UpdatePointForMatch = async (req, res) => {
  try {
    const { matchId } = req.body;

    const matchScore = await GetMatchScore(matchId);
    if (!matchScore) {
      res.status(500).json({
        message: "GetMatchScore got null.",
        isSuccess: false,
      });
    }
    const pointsForMatch = calculatePlayerPoints(matchScore).pointsCalculated;

    if (!pointsForMatch) {
      res.status(500).json({
        message: "pointsForMatch got null.",
        isSuccess: false,
      });
    }

    const pointData = PointSchema({
      matchNumber: 1,
      playersPoint: pointsForMatch,
    });

    output = await pointData.save();

    res.status(200).json({
      message: "CalculatePlayerPoints successful.",
      pointsForMatch,
      output,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "UpdatePointForMatch Failed.",
      error,
    });
  }
};

exports.CalculatePlayerPoints = async (req, res) => {
  try {
    const { matchId } = req.body;
    const matchScore = await GetMatchScoreV2(matchId);
    if (!matchScore) {
      return res.status(500).json({
        message: "GetMatchScore got null.",
        isSuccess: false,
      });
    }
    const pointsForMatch = calculatePlayerPoints(matchScore);

    if (!pointsForMatch) {
      return res.status(500).json({
        message: "pointsForMatch got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "CalculatePlayerPoints successful.",
      pointsForMatch,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "calculatePlayerPoints Failed.",
      error,
    });
  }
};

exports.CalculatePlayerPointsV2 = async (req,res) => {
  try {
    const { matchId } = req.body;
    const matchScore = await GetMatchScoreV2(matchId);
    if (!matchScore) {
      return res.status(500).json({
        message: "GetMatchScoreV2 got null.",
        isSuccess: false,
      });
    }
    const pointsForMatchV2 = calculatePlayerPointsV2(matchScore)
    //calculatePlayerPointsV2(matchScore).pointsCalculated;

    if (!pointsForMatchV2) {
      res.status(500).json({
        message: "pointsForMatchV2 got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "CalculatePlayerPointsV2 successful.",
      pointsForMatchV2,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "CalculatePlayerPointsV2 Failed.",
      error : error.message,
    });
  }
};

exports.CalculateMatchPoints = async (req, res) => {
  try {
    const { gameId, matchId } = req.params;
    console.log("gameId", gameId);
    console.log("matchId", matchId);

    var match = await MatchSchema.findOne({matchId});
    if (!match) {
      return res.status(404).json({
        message: "Match not found.",
        isSuccess: false,
      });
    }

    var point = await PointSchema.findOne({matchId});

    if (!point) {
      return res.status(404).json({
        message: "Point not found.",
        isSuccess: false,
      });
    }

    if(point.isPointCalculated) {
      return res.status(404).json({
        message: "Point already calculated.",
        isSuccess: false,
      });
    }

    if(!point.isMatchCompleted){
      return res.status(404).json({
        message: "Match not completed.",
        isSuccess: false,
      });
    }

    if(point.isMatchCompleted && point.isPointCalculated) {
      return res.status(404).json({
        message: "Match already completed with point calculation.",
        isSuccess: false,
      });
    }

    var game = await GameSchema.findById(gameId);
    if (!game) {
      return res.status(404).json({
        message: "Game not found.",
        isSuccess: false,
      });
    }

    var owners = await OwnerSchema.find({ games: gameId });
    if (!owners || owners.length === 0 && owners.length !== game.ownerId.length){
      return res.status(404).json({
        message: "Owners not found.",
        isSuccess: false,
      });
    }

    const matchScore = await GetMatchScoreV2(matchId);
    if (!matchScore) {
      return res.status(500).json({
        message: "matchScore got null.",
        isSuccess: false,
      });
    }

    var matchDetails = GetMatchScoreForCalculateMatchPoints(matchScore);
    if (!matchDetails) {
      return res.status(404).json({
        message: "Match details not found.",
        isSuccess: false,
      });
    }

    var finalMatchPointsData = CalculateMatchPointsForOwners(matchDetails, owners, game)
    var finalMatchPoints = finalMatchPointsData.pointsForMatchObject;
    
    // pointdb save logic

    var playersListCheck = finalMatchPointsData.pointsForMatch.map((player) => {
      return {
        playerName : player.playerName,
        playerId : player.playerId,
        teamName : "",
        totalPoints : player.fantasyPoint,
        playingType : player.playingType,
      }
    })
    point.playersPoints = playersListCheck
    
    point.isPointCalculated = true;
    

    // owner db save logic
    await Promise.all(owners.map(async (owner) => {
      const ownerId = owner._id.toString();
      const ownerMatchDetails = finalMatchPoints[ownerId];
      if (ownerMatchDetails) {
        owner.previousMatchPoint = owner.currentMatchPoint;
        owner.previousTotalPoint = owner.totalFantasyPoint;
        owner.currentMatchPoint = ownerMatchDetails.totalPoint;
        owner.totalFantasyPoint += ownerMatchDetails.totalPoint;
        // let matchNumber = owner.matchScoreList.length + 1;
        owner.matchScoreList.push(
          {
            matchId : match.matchId,
            matchNo : match.matchDesc,
            playedBetween : match.teamIds,
            team1 : match.team1.teamSName,
            team2 : match.team2.teamSName,
            matchScore : ownerMatchDetails.totalPoint
        })
        owner.fantasyPointDetails.push({
          pointType : "MATCHPOINT",
          point : ownerMatchDetails.totalPoint,
          totalFantasyPoint : owner.totalFantasyPoint,
          matchNumber : match.matchDesc,
          matchId : match.matchId,
        })
        await owner.save()
      } else {
        // If no match details found for the owner, you can handle it accordingly
        console.log(`No match details found for owner: ${ownerId}`);
        owner.previousMatchPoint = owner.currentMatchPoint;
        owner.previousTotalPoint = owner.totalFantasyPoint;
        owner.currentMatchPoint = 0;
        owner.totalFantasyPoint = owner.totalFantasyPoint;
        // let matchNumber = owner.matchScoreList.length + 1;
        owner.matchScoreList.push(
          {
            matchId : match.matchId,
            matchNo : match.matchDesc,
            playedBetween : match.teamIds,
            team1 : match.team1.teamSName,
            team2 : match.team2.teamSName,
            matchScore : 0
        })
        owner.fantasyPointDetails.push({
          pointType : "MATCHPOINT",
          point : 0,
          totalFantasyPoint : owner.totalFantasyPoint,
          matchNumber : match.matchDesc,
          matchId : match.matchId,
        })
        await owner.save()
      }
    }));

    var ownerFantasyPoint = []
    await Promise.all(owners.map(async (owner) => {
      const ownerId = owner._id.toString();
      const ownerMatchDetails = finalMatchPoints[ownerId];
      if (ownerMatchDetails) {
        var ownerObj = {
          teamOwner: owner._id,
          teamName : owner.ownerTeamName,
          iplTeamName : owner.teamName,
          previousMatchPoint : owner.previousMatchPoint,
          currentMatchPoint : ownerMatchDetails.totalPoint,
          previousTotalPoint : owner.previousTotalPoint,
          overallPoint : owner.totalFantasyPoint,
          currentPlayingXI: owner.playingXIList.map((player) => {
            return {
              playerName : player.playerName,
              playerId : player.playerId,
              playingType : player.playingType,
              totalPointForTheMatch : ownerMatchDetails.players.filter((playerData) => {
                return player.playerId === playerData.playerId
              }).length > 0 ? ownerMatchDetails.players.filter((playerData) => {
                return player.playerId === playerData.playerId
              })[0].fantasyPoint : 0
            }
          }),
          captain : owner.captain.captainName,
          viceCaptain : owner.viceCaptain.viceCaptainName,
        };

        ownerFantasyPoint.push(ownerObj);
        ownerObj.matchId = match.matchId;
        ownerObj.matchNo = match.matchDesc;
        owner.ownerFantasyPoint.push(ownerObj);
        await owner.save();

      }else{
        var ownerObj = {
          teamOwner: owner._id,
          teamName : owner.ownerTeamName,
          iplTeamName : owner.teamName,
          previousMatchPoint : owner.previousMatchPoint,
          currentMatchPoint : 0,
          previousTotalPoint : owner.previousTotalPoint,
          overallPoint : owner.totalFantasyPoint,
          currentPlayingXI: owner.playingXIList.map((player) => {
            return {
              playerName : player.playerName,
              playerId : player.playerId,
              playingType : player.playingType,
              totalPointForTheMatch : 0
            }
          }),
          captain : owner.captain.captainName,
          viceCaptain : owner.viceCaptain.viceCaptainName,
        }

        ownerFantasyPoint.push(ownerObj);
        ownerObj.matchId = match.matchId;
        ownerObj.matchNo = match.matchDesc;
        owner.ownerFantasyPoint.push(ownerObj);
        await owner.save();

      }
    }));

    // game db save logic
    game.pointsId.push(point._id);
    game.fantasyPoint.push({
      matchId : match.matchId,
      matchNo : match.matchDesc, 
      ownerFantasyPoint : ownerFantasyPoint
    })

    game.playerPoints.push({
      matchId : match.matchId,
      matchNo : match.matchDesc, 
      playersList : finalMatchPointsData.pointsForMatch.map((player) => {
        return {
          playerName : player.playerName,
          playerId : player.playerId,
          teamName : "",
          totalPointForTheMatch : player.fantasyPoint,
          playingType : player.playingType,
        }
      })
    })

    point.ownersPointForMatch = ownerFantasyPoint.map((owner) => {
      owner.matchId = match.matchId;
      owner.matchNo = match.matchDesc;
      return owner;
    });

    await point.save();
    await game.save();

    // owner.totalFantasyPoint = 0;
    // owner.matchScoreList.push('');
    // owner.fantasyPointDetails.push('');

    // game.pointsId.push('');
    // game.fantasyPoint.push('');
    // game.playerPoints.push('');

    // pointDatabase

    res.status(200).json({
      message: "CalculateMatchPoints successful.",
      // owners,
      gameId,
      matchId,
      matchDetails,
      finalMatchPoints,
      match,
      point,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "CalculateMatchPoints Failed.",
      error : error.message,
    });
  }
}

// check if match is completed or not, and if yes then isMatchCompleted = true
exports.CheckMatchCompleted = async (req, res) => {
  try {
    const { gameId, matchId } = req.params;
    const match = await MatchSchema.findOne({ matchId });
    if (!match) {
      return res.status(404).json({
        message: "Match not found.",
        isSuccess: false,
      });
    }

    const game = await GameSchema.findById(gameId);
    if (!game) {
      return res.status(404).json({
        message: "Game not found.",
        isSuccess: false,
      });
    }

    const point = await PointSchema.findOne({ matchId });

    if (!point) {
      var pointData = new PointSchema({
        matchId: matchId,
        matchNo : match.matchDesc,
        teamId: {
          team1: match.team1.teamId,
          team2: match.team2.teamId,
        },
        venueId: match.venueInfoId,
        isMatchCompleted: true,
        gameId : gameId,
        seriesId : game.seriesId,
        seriesDetails : game.seriesDetails,
      });
      await pointData.save();
      return res.status(200).json({
        message: "Match completed successfully.",
        isSuccess: true,
      });
    }

    if (point.isMatchCompleted) {
      return res.status(200).json({
        message: "Match already completed.",
        isSuccess: true,
      });
    } 
  }
  catch (error) {
    res.status(500).json({
      message: "CheckMatchCompleted Failed.",
      error,
    });
  }
}
