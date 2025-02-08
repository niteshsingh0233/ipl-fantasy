const express = require("express");
const MatchSchema = require("../models/matchModel.js");
const {
  MatchListFromSeriesId
} = require("../helpers/matchHelper.js");

exports.CreateMatch = async (req, res) => {
  try {

    var output = await MatchListFromSeriesId(req.params.seriesId)

    var out = await MatchSchema.insertMany(output);

    res.status(200).json({
      message: "CreateMatch successful.",
      isSuccess: true,
      out
    });
  } catch (error) {
    res.status(500).json({
      message: "CreateMatch Failed.",
      error,
    });
  }
};