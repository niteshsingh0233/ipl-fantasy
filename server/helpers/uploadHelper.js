const xlsx = require("xlsx");
const { EXCELFILEPATH } = require("../constants/constants.js");
const TeamSchema = require("../models/teamModel.js");
const TeamsList = require("../constants/enumConstants.js");
const PlayerSchema = require("../models/playerModel.js");

exports.UploadHelper = () => {
  const workbook = xlsx.readFile(EXCELFILEPATH());
  const sheetNames = workbook.SheetNames;
  const teamList = sheetNames[0];
  const playersList = sheetNames[1];
  return { teamList, playersList, workbook };
};

exports.CreateTeams = async (teamSheet, workbook) => {
  const teamData = xlsx.utils.sheet_to_json(workbook.Sheets[teamSheet]);

  const teamList = teamData.map((team) => {
    return TeamSchema({
      teamName: team.teamName,
      teamSize:
        team.teamSize === undefined || team.teamSize < 15 ? 15 : team.teamSize,
    });
  });

  const teams = await TeamSchema.insertMany(teamList);

  if (!teams) return false;
  return true;
};

exports.CreatePlayers = async (playerSheet, workbook) => {
  const playersData = xlsx.utils.sheet_to_json(workbook.Sheets[playerSheet]);

  const playerList = playersData.map((player) => {
    return PlayerSchema({
      playerName: player.playerName,
      countryName: player.countryName,
      isBatsman: player.isBatsman,
      isBowler: player.isBowler,
      isWicketKeeper: player.isWicketKeeper,
      isAllRounder: player.isAllRounder,
      isCaptain: player.isCaptain,
      isViceCaptain: player.isViceCaptain,
    });
  });

  const players = await PlayerSchema.insertMany(playerList);

  if (!players) return false;
  return true;
};
