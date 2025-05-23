const express = require("express");
const {
  GetMatchScore,
  calculatePlayerPoints,
  GetSeriesPointTable
} = require("../helpers/matchScoreHelper.js");
const {MATCHESLIST, URLConstants} = require('../constants/urlConstants.js')
const {cricbuzzAPIHelper} = require('../helpers/crircbuzzAPIHelper.js')

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

exports.GetSeriesPointsTable = async (req, res) => {
  try {
    const { seriesId } = req.body;
    const seriesPointTable = await GetSeriesPointTable(seriesId);
    if (!seriesPointTable) {
      res.status(500).json({
        message: "seriesPointTable got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "GetSeriesPointTable successful.",
      seriesPointTable,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "GetSeriesPointTable Failed.",
      error,
    });
  }

}

exports.GetMatchesList = async (req,res) =>{
  try {
    console.log(req.params.listType)
    const URL = URLConstants[MATCHESLIST[req.params.listType]]
    console.log(URL)
    const getMatchesList = await cricbuzzAPIHelper(URL);
    if (!getMatchesList) {
      res.status(500).json({
        message: "GetMatchesList got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "GetMatchesList successful.",
      getMatchesList,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "GetMatchesList Failed.",
      error,
    });
  }
}

exports.GetMatchScoreV2 = async (req,res) =>{
  try {
    const URL = `${URLConstants["MATCHES_GET_SCORECARDV2"]}/${req.params.matchId}/hscard`
    const getMatchScoreV2 = await cricbuzzAPIHelper(URL);
    if (!getMatchScoreV2) {
      res.status(500).json({
        message: "getMatchScoreV2 got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "getMatchScoreV2 successful.",
      getMatchScoreV2,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "getMatchScoreV2 Failed.",
      error,
    });
  }
}

exports.GetPlayingXIForMatchForTeam = async (req,res) => {
  try{
    var urlConst = `${URLConstants["GET_TEAM_PLAYINGXI_FOR_MATCHID"]}`
    var URL = urlConst.replace("matchIdReplace", req.params.matchId)
    URL = URL.replace("teamIdReplace", req.params.teamId)
    const getPlayingXIForMatchForTeam = await cricbuzzAPIHelper(URL);
    if (!getPlayingXIForMatchForTeam) {
      return res.status(500).json({
        message: "GetPlayingXIForMatchForTeam got null.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "GetPlayingXIForMatchForTeam successful.",
      getPlayingXIForMatchForTeam,
      isSuccess: true,
    });

  }catch(error){
    res.status(500).json({
      message: "GetPlayingXIForMatchForTeam Failed.",
      error : error.message,
    });
  }
}

exports.GetMatchOversForMatchAndInning = async (req,res) => {
  try{
    var urlConst = `${URLConstants["GET_OVER_DETAILS_FOR_MATCH_AND_INNING"]}`
    var URL = urlConst.replace("matchIdReplace", req.params.matchId)
    if(req.params.inningId != 0)
      URL = `${URL}?iid=${req.params.inningId}`
    const getPlayingXIForMatchForTeam = await cricbuzzAPIHelper(URL);
    if (!getPlayingXIForMatchForTeam) {
      console.log(getPlayingXIForMatchForTeam)
      return res.status(200).json({
        message: "GetMatchOversForMatchAndInning got null.",
        isSuccess: false,
        URL
      });
    }

    res.status(200).json({
      message: "GetMatchOversForMatchAndInning successful.",
      getPlayingXIForMatchForTeam,
      isSuccess: true,
    });

  }catch(error){
    res.status(500).json({
      message: "GetMatchOversForMatchAndInning Failed.",
      error,
    });
  }
}