const express = require("express");
const {
  CreateTeam,
  GetTeamListDetailsController,
  GetTeamSchedulesController,
  GetTeamResultsController,
  GetTeamNewsController,
  GetTeamPlayersController,
  GetTeamStatFiltersController,
  GetTeamStatDetailsController,

  GetVenueInfoController,
  GetVenueStatsInfoController,
  GetVenueMatchesController
} = require("../controllers/teamController.js");

const router = express.Router();

router
  .post("/create-teams", CreateTeam)
  .get("/get-team-list/:typeId", GetTeamListDetailsController)
  .get("/get-team-schedules/:teamId", GetTeamSchedulesController)
  .get("/get-team-results/:teamId", GetTeamResultsController)
  .get("/get-team-news/:teamId", GetTeamNewsController)
  .get("/get-team-players/:teamId", GetTeamPlayersController)
  .get("/get-team-stat-filters/:teamId", GetTeamStatFiltersController)
  .get("/get-team-stat-details/:teamId/:statType", GetTeamStatDetailsController)
  .get("/get-venue-info/:venueId", GetVenueInfoController)
  .get("/get-venue-stats/:venueId", GetVenueStatsInfoController)
  .get("/get-venue-matches/:venueId", GetVenueMatchesController);

module.exports = router;
