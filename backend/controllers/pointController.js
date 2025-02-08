const express = require("express");
const PointSchema = require("../models/pointModel.js");
const {
  GetMatchScore,
  calculatePlayerPoints,
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
    const matchScore = await GetMatchScore(matchId);
    if (!matchScore) {
      res.status(500).json({
        message: "GetMatchScore got null.",
        isSuccess: false,
      });
    }
    const pointsForMatch = calculatePlayerPoints(matchScore);

    if (!pointsForMatch) {
      res.status(500).json({
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