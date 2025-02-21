const express = require("express");
const SeriesSchema = require("../models/seriesModel.js");
const {
  CreateSeriesFromSeriesId,
  UpdateSeriesVenues,
  UpdateSeriesMatches,
  UpdateSeriesTeams,
  UpdateSeriesSquads,
  UpdateSeriesSquadPlayers,
  GetSeriesDetailsHelper,
} = require("../helpers/seriesHelper.js");

exports.CreateSeries = async (req, res) => {
  try {
    var output = await CreateSeriesFromSeriesId(req.params.seriesType);

    var out = await SeriesSchema.insertMany(output);

    res.status(200).json({
      message: "CreateSeries successful.",
      isSuccess: true,
      out,
    });
  } catch (error) {
    res.status(500).json({
      message: "CreateSeries Failed.",
      error,
    });
  }
};

exports.UpdateSeriesDetails = async (req, res) => {
  try {
    const series = await SeriesSchema.findOne({
      seriesId: req.params.seriesId,
    });
    console.log(series);

    if (!series) {
      res.status(200).json({
        message: "series Details not found",
        isSuccess: true,
      });
    }

    series.venues = await UpdateSeriesVenues(req.params.seriesId);
    series.matches = await UpdateSeriesMatches(req.params.seriesId);
    series.teams = await UpdateSeriesTeams(
      await GetSeriesDetailsHelper(req.params.seriesId)
    );
    series.squads = await UpdateSeriesSquads(
      await GetSeriesDetailsHelper(req.params.seriesId)
    );
    series.squadPlayers = await UpdateSeriesSquadPlayers(
      req.params.seriesId,
      series.squads
    );

    var output = await series.save();

    res.status(200).json({
      message: "UpdateSeriesDetails successful.",
      isSuccess: true,
      series,
      output,
    });
  } catch (error) {
    res.status(500).json({
      message: "UpdateSeriesDetails Failed.",
      error,
    });
  }
};

exports.GetSeriesDetails = async (req, res, next) => {
  try {
    const series = await SeriesSchema.findOne({ seriesId: req.params.seriesId })
      .populate(['teams', 'venues', 'games', 'squadPlayers.players', 'matches'])

      
      
    if (!series) {
      res.status(200).json({
        message: "series Details not found",
        isSuccess: true,
      });
    }
    console.log(series);
    res.status(200).json({
      message: "GetSeriesDetails successful.",
      isSuccess: true,
      series,
    });
  } catch (error) {
    res.status(500).json({
      message: "GetSeriesDetails Failed.",
      error,
    });
  }
};
