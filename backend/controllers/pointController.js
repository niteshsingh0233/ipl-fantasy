const express = require("express");
const PointSchema = require("../models/pointModel.js");
const {
  GetMatchScore,
  calculatePlayerPoints,
  GetMatchScoreV2,
  calculatePlayerPointsV2
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