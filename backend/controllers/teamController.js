const express = require("express");
const TeamModel = require("../models/teamModel.js");
const {TeamHelper} = require('../helpers/teamHelper.js')

exports.CreateTeam = async (req, res) => {
  try {

    
    let output = [];
    let message = "";

    console.log('hi2')
    response = await TeamHelper();
    console.log(output)

    output = await TeamModel.insertMany(response)
    res.status(201).json({
      message: message,
      count: output.length,
      teams: output,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while team creation.",
      error,
      success: false,
    });
  }
};