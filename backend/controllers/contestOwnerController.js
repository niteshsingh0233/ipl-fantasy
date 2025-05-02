const express = require("express");
const ContestSchema = require("../models/contestModel.js");
const ContestOwnerSchema = require("../models/contestOwnerModel.js");
const matchSchema = require("../models/matchModel.js");
const userSchema = require("../models/userModel.js");

exports.CreateContestOwner = async (req, res) => {
  try {
    const { contestId } = req.params;

    const contest = await ContestSchema.findById(contestId);

    if (!contest) {
      return res.status(404).json({
        message: "contest details not found",
        isSuccess: false,
      });
    }

    if (contest.users.includes(req.user._id)) {
      return res.status(404).json({
        message:
          "User has already joined this contest with one team, create another team and join the contest.",
        isSuccess: false,
      });
    }

    let contestOwner = new ContestOwnerSchema({
      userId: req.user._id,
      contestId: contest._id,
      matchId: contest.matchDetails,
      contest: contest._id,
      match: contest.matchId,
      userName: req.user.userName,
      matchPlayedBetween: contest.matchPlayedBetween,
      contestTeams: [
        {
          ownerTeamName: "contestowner11" + Date.now(),
          playingXI: [],
          playingXICount: 0,
          playingXITeamCount: {
            team1: {
              teamId: contest.matchPlayedBetween.team1.teamId,
              teamName: contest.matchPlayedBetween.team1.teamName,
              teamShortName: contest.matchPlayedBetween.team1.teamShortName,
              playerCount: 0,
            },
            team2: {
              teamId: contest.matchPlayedBetween.team2.teamId,
              teamName: contest.matchPlayedBetween.team2.teamName,
              teamShortName: contest.matchPlayedBetween.team2.teamShortName,
              playerCount: 0,
            },
            captain: {
              captainId: "",
              captainName: "",
            },
            viceCaptain: {
              viceCaptainId: "",
              viceCaptainName: "",
            },
            entryFeePaid: true,
            totalEntryAmount: contest.contestEntryFee,
            totalEntryAmountPaid: contest.contestEntryFee,
            maximumPoints: contest.maximumPoints,
            pointsLeft: contest.maximumPoints,
            totalFantasyPoint: 0,
          },
        },
      ],
    });

    contestOwner = await contestOwner.save();

    contest.users.push(req.user._id);
    contest.contestOwners.push(contestOwner._id);

    await contest.save();

    res.status(201).json({
      message: "contestOwner created successfully.",
      isSuccess: true,
      contestOwner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create contestOwner.",
      isSuccess: false,
      error,
    });
  }
};

exports.CreateTeamAndJoinContestOwnerAndContest = async (req, res) => {
  try {
    const { contestId, contestOwnerId } = req.params;
    const { draftPlayers, captainId, viceCaptainId } = req.body;

    const contest = await ContestSchema.findById(contestId);
    const contestOwner = await ContestOwnerSchema.findById(contestOwnerId);

    if(captainId == viceCaptainId){
      return res.status(404).json({
        message: "captain and vicecaptain can't be same player.",
        isSuccess: false,
      });
    }

    if (!contest) {
      return res.status(404).json({
        message: "contest data not found",
        isSuccess: false,
      });
    }

    if (!contestOwner) {
      return res.status(404).json({
        message: "contestOwner data not found",
        isSuccess: false,
      });
    }

    if (draftPlayers.length != 11) {
      return res.status(404).json({
        message: "draftPlayer count is not 11.",
        isSuccess: false,
      });
    }

    let captain =  {
      captainId: "",
      captainName: "",
    }
    let viceCaptain = {
      viceCaptainId: "",
      viceCaptainName: "",
    }
    let team1PlayerCount = 0
    let team2PlayerCount = 0

    let playerListDetails = contest.playersList.filter((player) => {
      if(draftPlayers.includes(player.playerId)){
        if(player.playerId == captainId){
          captain.captainId = player.playerId
          captain.captainName = player.playerName

        }
        if(player.playerId == viceCaptainId){
          viceCaptain.viceCaptainId = player.playerId
          viceCaptain.viceCaptainName = player.playerName
        }
        if(contest.matchPlayedBetween.team1.teamId == player.playerTeamId){
          team1PlayerCount = ++team1PlayerCount
        }
        if(contest.matchPlayedBetween.team2.teamId == player.playerTeamId){
          team2PlayerCount = ++team2PlayerCount
        }
        return {
          playerId : player.playerId,
          playerName : player.playerName,
          playerRole : player.playingStyle,
          playerTeamId : player.playerTeamId,
          isCaptain : player.playerId == captainId,
          isViceCaptain : player.playerId == viceCaptainId,
          playerBuyingPoint : 9,
          playerFantasyPoint : 0
        }
      }
    })

    if (
      contestOwner.contestTeams.length == 1 &&
      contestOwner.contestTeams[0].playingXICount == 0) 
      {
        contestOwner.contestTeams[0].playingXICount = draftPlayers.length,
        contestOwner.contestTeams[0].playingXI = playerListDetails,
        contestOwner.contestTeams[0].captain = captain,
        contestOwner.contestTeams[0].viceCaptain = viceCaptain
        contestOwner.contestTeams[0].pointsLeft = contest.maximumPoints - draftPlayers.length * 9

        contestOwner.contestTeams[0].playingXITeamCount.team1.playerCount = team1PlayerCount
        contestOwner.contestTeams[0].playingXITeamCount.team2.playerCount = team2PlayerCount

    } else {
      contestOwner.contestTeams.push({
        ownerTeamName: "contestowner11_team" + ++contestOwner.contestTeams.length + "_" + Date.now(),
        playingXI: playerListDetails,
        playingXICount: draftPlayers.length,
        playingXITeamCount: {
          team1: {
            teamId: contest.matchPlayedBetween.team1.teamId,
            teamName: contest.matchPlayedBetween.team1.teamName,
            teamShortName: contest.matchPlayedBetween.team1.teamShortName,
            playerCount: team1PlayerCount,
          },
          team2: {
            teamId: contest.matchPlayedBetween.team2.teamId,
            teamName: contest.matchPlayedBetween.team2.teamName,
            teamShortName: contest.matchPlayedBetween.team2.teamShortName,
            playerCount: team2PlayerCount,
          },
          captain: captain,
          viceCaptain: viceCaptain,
          entryFeePaid: true,
          totalEntryAmount: contest.contestEntryFee,
          totalEntryAmountPaid: contest.contestEntryFee,
          maximumPoints: contest.maximumPoints,
          pointsLeft: contest.maximumPoints - draftPlayers.length * 9,
          totalFantasyPoint: 0,
        },
      });
    }

    await contestOwner.save()

    res.status(201).json({
      message: "CreateTeamAndJoinContestOwnerAndContest created successfully.",
      isSuccess: true,
      contestOwner,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to CreateTeamAndJoinContestOwnerAndContest.",
      isSuccess: false,
      error,
    });
  }
};
