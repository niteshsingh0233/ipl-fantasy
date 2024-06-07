const express = require("express");
const PlayerSchema = require("../models/playerModel.js");
const TeamsList = require("../constants/enumConstants.js");
const TeamSchema = require("../models/teamModel.js");
const {
  UploadHelper,
  CreateTeams,
  CreatePlayers,
} = require("../helpers/uploadHelper.js");

exports.CreateMasterDataFromExcel = async (req, res) => {
  try {
    const excelFile = UploadHelper();
    const teamListCreated = await CreateTeams(
      excelFile.teamList,
      excelFile.workbook
    );
    const playersListCreated = await CreatePlayers(
      excelFile.playersList,
      excelFile.workbook
    );

    if (!teamListCreated && !playersListCreated) {
      res.status(500).json({
        message: "upload failed",
        error,
        success: false,
      });
    } else if (!teamListCreated) {
      res.status(500).json({
        message: "team upload failed",
        error,
        success: false,
      });
    } else if (!playersListCreated) {
      res.status(500).json({
        message: "player upload failed",
        error,
        success: false,
      });
    } else if (teamListCreated && playersListCreated) {
      res.status(201).json({
        message: "upload successful.",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in uploading excel file.",
      error,
      success: false,
    });
  }
};
