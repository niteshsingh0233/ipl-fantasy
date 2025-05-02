const express = require("express");
const ContestSchema = require("../models/contestModel.js");
const ContestOwnerSchema = require("../models/contestOwnerModel.js");
const matchSchema = require("../models/matchModel.js");
const userSchema = require("../models/userModel.js");

exports.CreateContest = async (req, res) => {
  try {
    const { matchId } = req.params;

    // Check if the match exists
    const match = await matchSchema.findOne({matchId});
    if (!match) {
      return res.status(404).json({
        message: "Match not found.",
        isSuccess: false,
      });
    }

    // Create the contest
    const contest = new ContestSchema({
        contestName : "Contest" + matchId + Date.now(),
        matchId : matchId,
        matchDetails : match._id,
        contestOwners : [],
        users : [],
        matchPlayedBetween : {
            team1 : {
                teamId : match.team1.teamId,
                teamName : match.team1.teamName,
                teamShortName : match.team1.teamSName
            },
            team2 : {
                teamId : match.team2.teamId,
                teamName : match.team2.teamName,
                teamShortName : match.team2.teamSName
            }
        },
        maximumContestOwners : 5,
        maximumPoints : 100,
        contestEntryFee : 100,
        maximumWinnerCount : 2,
        teamsAllowed : "SINGLE_TEAM",
        playersList : [],
        gameRules : {
            maxBowlerCountInPlayingXI : 5,
            maxBatsmanCountInPlayingXI : 5,
            maxAllRounderCountInPlayingXI : 5,
            maxWicketKeeperCountInPlayingXI : 2,
            minBowlerCountInPlayingXI : 2,
            minBatsmanCountInPlayingXI : 2,
            minAllRounderCountInPlayingXI : 2,
            minWicketKeeperCountInPlayingXI : 1
        },
        contestStatus : "ACTIVE",
        contestType : "PAID",
        contestStyle : "CLASSIC",
        contestVisibility : "PUBLIC",
        contestWinner : [],
        contestWinnerCount : 0,
    }); 
    await contest.save();
    
    res.status(201).json({
      message: "Contest created successfully.",
      isSuccess: true,
      contest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create contest.",
      isSuccess: false,
      error,
    });
  }
}