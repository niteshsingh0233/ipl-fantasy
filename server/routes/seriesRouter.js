const express = require("express");
const {
  GetSeriesListController,
  GetSeriesArchiveListController,
  GetSeriesMatches,
  GetSeriesSquad,
  GetSeriesSquadPlayers,
  GetSeriesVenueList,
  GetSeriesStatFilters,
  GetSeriesStatDetails
} = require("../controllers/seriesController.js");
const router = express.Router();

router
  .get("/get-series-list/:id", GetSeriesListController)
  .get("/get-series-archive-list/:id", GetSeriesArchiveListController)
  .get('/get-series-matches-list/:id',GetSeriesMatches)
  .get('/get-series-squad/:id', GetSeriesSquad)
  .get('/get-series-squad-players/:seriesId/:squadId', GetSeriesSquadPlayers)
  .get('/get-series-venues-list/:seriesId', GetSeriesVenueList)
  .get('/get-series-stat-filters/:seriesId',GetSeriesStatFilters)
  .get('/get-series-stats-details/:seriesId', GetSeriesStatDetails )

module.exports = router;
