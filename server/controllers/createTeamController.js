const express = require("express");
const TeamModel = require("../models/createTeamModel.js");
const TeamsList = require("../constants/enumConstants.js");
const {CreateTeamHelper} = require('../helpers/createTeamHelper.js')

exports.CreateTeamController = async (req, res) => {
  try {

    
    let output = [];
    let message = "";

    console.log('hi2')
    response = await CreateTeamHelper();
    console.log(output)

    //output = await TeamModel.insertMany(response)
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