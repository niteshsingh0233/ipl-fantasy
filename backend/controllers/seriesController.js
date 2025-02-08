const express = require("express");
const SeriesSchema = require("../models/seriesModel.js");
const {
  CreateSeriesFromSeriesId
} = require("../helpers/seriesHelper.js");

exports.CreateSeries = async (req, res) => {
  try {

    var output = await CreateSeriesFromSeriesId(req.params.seriesType)

    var out = await SeriesSchema.insertMany(output);

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