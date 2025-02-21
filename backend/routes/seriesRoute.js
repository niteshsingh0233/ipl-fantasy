const express = require("express");
const { CreateSeries, UpdateSeriesDetails, GetSeriesDetails } = require("../controllers/seriesController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");
const router = express.Router();

router.get("/admin/create-series/:seriesType",RequireSignIn, authorizeRoles('Admin'),CreateSeries)
.post("/admin/updateSeriesDetails/:seriesId", RequireSignIn,authorizeRoles('Admin'),UpdateSeriesDetails)
.get("/getSeriesDetails/:seriesId", GetSeriesDetails)

module.exports = router;
