const express = require("express");
const TeamSchema = require("../models/teamModel.js");
const TeamsList = require("../constants/enumConstants.js");

exports.CreateTeam = async (req, res) => {
  try {
    const teamName = req.query.teamname;
    const teamsize = req.query.teamsize;

    if (teamName) {
      const teamsData = await TeamSchema.find({ teamName });
      if (teamsData.length > 0) {
        res.status(400).json({ message: `${teamName} team already exists.` });
        return;
      }
    } else {
      const teamsData = await TeamSchema.find();
      if (teamsData.length > 0) {
        res.status(400).json({ message: `Teams already exists.` });
        return;
      }
    }

    let output = null;
    let message = "";

    if (teamName) {
      const team = TeamSchema({
        teamName,
        teamSize: teamsize === undefined || teamsize < 15 ? 15 : teamsize,
      });

      output = await team.save();
      message = `${teamName} team created with teamsize ${
        teamsize === undefined || teamsize < 15 ? 15 : teamsize
      }.`;
    } else {
      const teams = TeamsList.map((name) => {
        return TeamSchema({
          teamName: name,
          teamSize: teamsize === undefined || teamsize < 15 ? 15 : teamsize,
        });
      });

      output = await TeamSchema.insertMany(teams);
      message = "Teams Created successfully.";
    }

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
