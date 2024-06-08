const express = require("express");
const { GetMatchScore } = require("../helpers/matchScoreHelper.js");

exports.GetMatchScore = async (req, res) => {
  try {
    const { matchId } = req.body;
    console.log(matchId);
    matchScore = await GetMatchScore(matchId);
  } catch (error) {}
};
