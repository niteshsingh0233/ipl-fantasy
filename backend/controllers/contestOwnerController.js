const express = require("express");
const ContestSchema = require("../models/contestModel.js");
const ContestOwnerSchema = require("../models/contestOwnerModel.js");
const matchSchema = require("../models/matchModel.js");
const userSchema = require("../models/userModel.js");

exports.CreateContestOwner = async (req, res) => {
  try {
    const { contestId } = req.params;

   const contest = await ContestSchema.findById(contestId)

   if(!contest){
    return res.status(404).json({
        message : "contest details not found",
        isSuccess : false
    })
   }

   let contestOwner = new ContestOwnerSchema({
    userId : req.user._id,
    contestId : contest._id,
    matchId : contest.matchDetails,
    contest : contest._id,
    match : contest.matchId,
    userName : req.user.userName,
    matchPlayedBetween : contest.matchPlayedBetween,
   })

   await contestOwner.save()

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
}