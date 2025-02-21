const express = require("express");
const OwnerSchema = require("../models/ownerModel.js");
const Games = require("../models/gameModel.js")

exports.CreateOwner = async (req, res) => {
  try {
    const {
      ownerTeamName,
      // teamName,
      // ownerId,
      // playersList,
      // totalPlayerCount,
      // totalBatsmanCount,
      // totalBowlerCount,
      // totalAllRounderCount,
      // totalWicketKeeperCount,
      // playingXIList,
      // playingXICount,
      // playingXIBatsmanCount,
      // playingXIBowlerCount,
      // playingXIAllRounderCount,
      // playingXIWicketKeeperCount,
      // captainSwapCount,
      // playerSwapCount,
      // captainSwaps,
      // playerSwaps,
      // captain,
      // viceCaptain,
      // matchScoreList,
    } = req.body;

    console.log(req.body)

    const owners = await OwnerSchema.find();
    if (owners.length >= 10) {
      res.status(500).json({
        message: "owner limit exceeds.",
      });
    }

    // const ownerData = await OwnerSchema.findOne({ ownerId }).populate('ownerId');
    // console.log(ownerData)
    // if (ownerData) {
    //   res.status(500).json({
    //     message: "owner already exists.",
    //   });
    //   return;
    // }

    const owner = OwnerSchema({
      ownerTeamName,
      // teamName,
      ownerId : req.user._id
      // playersList,
      // totalPlayerCount,
      // totalBatsmanCount,
      // totalBowlerCount,
      // totalAllRounderCount,
      // totalWicketKeeperCount,
      // playingXIList,
      // playingXICount,
      // playingXIBatsmanCount,
      // playingXIBowlerCount,
      // playingXIAllRounderCount,
      // playingXIWicketKeeperCount,
      // captainSwapCount,
      // playerSwapCount,
      // captainSwaps,
      // playerSwaps,
      // captain,
      // viceCaptain,
      // matchScoreList,
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


exports.AddRetainedPlayer = async (req,res,next) => {
  try {
    const {ownerId} = req.params.ownerId
  } catch (error) {
    res.status(500).json({
      message: "Error in AddRetainedPlayer.",
      error,
      success: false,
    });
  }
}

exports.PayEntryFee = async (req,res,next) => {
  try {
    const {ownerId} = req.params.ownerId
  } catch (error) {
    res.status(500).json({
      message: "Error in PayEntryFee.",
      error,
      success: false,
    });
  }
}