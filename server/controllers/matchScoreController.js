const express = require("express");
const {
  GetMatchScore,
  calculatePlayerPoints,
} = require("../helpers/matchScoreHelper.js");

exports.GetMatchScore = async (req, res) => {
  try {
    const { matchId } = req.body;
    const matchScore = await GetMatchScore(matchId);
    if (!matchScore) {
      res.status(500).json({
        message: "GetMatchScore got null.",
        isSuccess: false,
      });
    }
    res.status(200).json({
      message: "GetMatchScore success.",
      matchScore: matchScore,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "GetMatchScore Failed.",
      error: error,
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
