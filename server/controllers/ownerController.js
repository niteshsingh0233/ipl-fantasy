const express = require("express");
const OwnerSchema = require("../models/ownerModel.js");
const TeamsList = require("../constants/enumConstants.js");

exports.CreateOwner = async (req, res) => {
  try {
    const {
      ownerName,
      ownerTeamName,
      teamName,
      playersList,
      totalPlayerCount,
      totalBatsmanCount,
      totalBowlerCount,
      totalAllRounderCount,
      totalWicketKeeperCount,
      playingXIList,
      playingXICount,
      playingXIBatsmanCount,
      playingXIBowlerCount,
      playingXIAllRounderCount,
      playingXIWicketKeeperCount,
      captainSwapCount,
      playerSwapCount,
      captainSwaps,
      playerSwaps,
      captain,
      viceCaptain,
      matchScoreList,
    } = req.body;

    const owners = await OwnerSchema.find();
    if (owners.length >= 10) {
      res.status(500).json({
        message: "owner limit exceeds.",
      });
    }

    const ownerData = await OwnerSchema.findOne({ ownerName, teamName });
    if (ownerData) {
      res.status(500).json({
        message: "owner already exists.",
      });
    }

    const owner = OwnerSchema({
      ownerName,
      ownerTeamName,
      teamName,
      playersList,
      totalPlayerCount,
      totalBatsmanCount,
      totalBowlerCount,
      totalAllRounderCount,
      totalWicketKeeperCount,
      playingXIList,
      playingXICount,
      playingXIBatsmanCount,
      playingXIBowlerCount,
      playingXIAllRounderCount,
      playingXIWicketKeeperCount,
      captainSwapCount,
      playerSwapCount,
      captainSwaps,
      playerSwaps,
      captain,
      viceCaptain,
      matchScoreList,
    });

    ownerOutput = await owner.save();

    res.status(200).json({
      message: "Owner Data successfully created.",
      owner: ownerOutput,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in creating owner.",
      error,
      success: false,
    });
  }
};
