const express = require("express");
const VenueModel = require("../models/venueModel.js");
const {VenueHelper} = require('../helpers/venueHelper.js')

exports.CreateVenue = async (req, res) => {
  try {

    
    let output = [];
    let message = "";

    console.log('hi2')
    console.log(req.params.seriesId)
    response = await VenueHelper(req.params.seriesId);
    console.log(output)

    output = await VenueModel.insertMany(response)
    res.status(201).json({
      message: message,
      count: output.length,
      teams: output,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while VenueModel creation.",
      error,
      success: false,
    });
  }
};