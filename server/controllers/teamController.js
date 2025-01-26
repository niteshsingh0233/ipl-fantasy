const express = require("express");
const TeamSchema = require("../models/teamModel.js");
const TeamsList = require("../constants/enumConstants.js");
const {URLConstants, TEAMLIST} = require('../constants/urlConstants.js')
const {cricbuzzAPIHelper} = require('../helpers/crircbuzzAPIHelper.js')

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

exports.GetTeamListDetailsController = async (req, res) => {
  try {
    const URL = `${URLConstants[TEAMLIST[req.params.typeId]]}`
    const getTeamListDetails = await cricbuzzAPIHelper(URL);
    if (!getTeamListDetails) {
      res.status(500).json({
        message: "getTeamListDetails got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "getTeamListDetails successful.",
      getTeamListDetails,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getTeamListDetails.",
      error,
      success: false,
    });
  }
};

exports.GetTeamSchedulesController = async (req, res) => {
  try {
    const URL = `${URLConstants['TEAM_GET_SCHEDULE']}`
    const getTeamSchedules = await cricbuzzAPIHelper(URL);
    if (!getTeamSchedules) {
      res.status(500).json({
        message: "getTeamSchedules got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "getTeamSchedules successful.",
      getTeamSchedules,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getTeamSchedules.",
      error,
      success: false,
    });
  }
};

exports.GetTeamResultsController = async (req, res) => {
  try {
    const URL = `${URLConstants['TEAM_GET_RESULTS']}`
    const getTeamResults = await cricbuzzAPIHelper(URL);
    if (!getTeamResults) {
      res.status(500).json({
        message: "getTeamResults got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "getTeamResults successful.",
      getTeamResults,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getTeamResults.",
      error,
      success: false,
    });
  }
};

exports.GetTeamNewsController = async (req, res) => {
  try {
    const URL = `${URLConstants['TEAM_GET_NEWS']}`
    const getTeamNews = await cricbuzzAPIHelper(URL);
    if (!getTeamNews) {
      res.status(500).json({
        message: "getTeamNews got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "getTeamNews successful.",
      getTeamNews,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getTeamNews.",
      error,
      success: false,
    });
  }
};

exports.GetTeamPlayersController = async (req, res) => {
  try {
    const URL = `${URLConstants['TEAM_GET_PLAYERS']}`
    const getTeamPlayers = await cricbuzzAPIHelper(URL);
    if (!getTeamPlayers) {
      res.status(500).json({
        message: "getTeamPlayers got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "getTeamPlayers successful.",
      getTeamPlayers,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getTeamPlayers.",
      error,
      success: false,
    });
  }
};

exports.GetTeamStatFiltersController = async (req, res) => {
  try {
    const URL = `${URLConstants['TEAM_GET_STAT_FILTERS']}`
    const getTeamStatFilters = await cricbuzzAPIHelper(URL);
    if (!getTeamStatFilters) {
      res.status(500).json({
        message: "getTeamStatFilters got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "getTeamStatFilters successful.",
      getTeamStatFilters,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getTeamStatFilters.",
      error,
      success: false,
    });
  }
};

exports.GetTeamStatDetailsController = async (req, res) => {
  try {
    const URL = `${URLConstants['TEAM_GET_STAT_FILTERS_DETAILS']}`
    const getTeamStatFiltersDetails = await cricbuzzAPIHelper(URL);
    if (!getTeamStatFiltersDetails) {
      res.status(500).json({
        message: "getTeamStatFiltersDetails got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "getTeamStatFiltersDetails successful.",
      getTeamStatFiltersDetails,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getTeamStatFiltersDetails.",
      error,
      success: false,
    });
  }
};


exports.GetVenueInfoController = async (req,res) => {
  try {
      const venueId = req.params.venueId
      let URL = URLConstants['GET_VENUE_INFO']

      let response = await cricbuzzAPIHelper(URL);
      res.status(200).json({
          message: "",
          response: response,
        });
        


  } catch (error) {
      res.status(500).json({
          message: "",
          error: error,
        });
  }
}

exports.GetVenueStatsInfoController = async (req,res) => {
  try {
      const venueId = req.params.venueId
      let URL = URLConstants['GET_VENUE_STATS']

      let response = await cricbuzzAPIHelper(URL);
      res.status(200).json({
          message: "",
          response: response,
        });
        


  } catch (error) {
      res.status(500).json({
          message: "",
          error: error,
        });
  }
}

exports.GetVenueMatchesController = async (req,res) => {
  try {
      const venueId = req.params.venueId
      let URL = URLConstants['GET_VENUE_MATCHES']

      let response = await cricbuzzAPIHelper(URL);
      res.status(200).json({
          message: "",
          response: response,
        });
        


  } catch (error) {
      res.status(500).json({
          message: "",
          error: error,
        });
  }
}