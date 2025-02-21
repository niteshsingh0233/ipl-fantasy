const axios = require("axios");
const httpHelper = require("../helpers/httpHelper.js");

exports.CreateSeriesFromSeriesId = async (seriesType) => {
  console.log(seriesType);
  const options = {
    method: "GET",
    url: `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-series-list/${seriesType}`,
  };
  let response = await axios.request(options);
  console.log(response.data);
  if (response.data && response.data.response.seriesMapProto.length > 0) {
    let output = [];
    let count = 0;
    console.log(response.data);
    response.data.response.seriesMapProto.forEach((element) => {
      element.series.forEach((series) => {
        let dataObject = {
          id: series.id,
          seriesId: series.id.toString(),
          name: series.name,
          date: element.date,
        };

        output.push(dataObject);
      });
    });
    //return response.data
    return output;
  }
  return false;
};

exports.UpdateSeriesVenues = async (seriesId) => {
  const options = {
    method: "GET",
    url: `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-series-venues-list/${seriesId}`,
  };
  let response = await axios.request(options);
  //console.log(response)
  const seriesVenueList = response.data.response.seriesVenue.map((element) => {
    return element.id;
  });
  console.log(seriesVenueList);

  let seriesMatchesList = await httpHelper.DMHelper(
    "venues",
    "id",
    seriesVenueList
  );
  return seriesMatchesList;
  //venues.push('sdds')
};

exports.UpdateSeriesMatches = async (seriesId) => {
  let seriesMatchesList = await httpHelper.DMHelper("matches", "id", seriesId);
  return seriesMatchesList;
};

exports.GetSeriesDetailsHelper = async (seriesId) => {
  const options = {
    method: "GET",
    url: `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-series-squad/${seriesId}`,
  };
  let response = await axios.request(options);
  return response;
};

exports.UpdateSeriesTeams = async (response) => {
  const seriesTeamList = [];
  response.data.response.squads.forEach((element) => {
    if (!element.isHeader) {
      seriesTeamList.push(element.teamId);
    }
  });
  console.log(seriesTeamList);

  let seriesTeamLists = await httpHelper.DMHelper(
    "teams",
    "id",
    seriesTeamList
  );
  return seriesTeamLists;
};

exports.UpdateSeriesSquads = async (response) => {
  const seriesSquadList = [];
  response.data.response.squads.forEach((element) => {
    if (!element.isHeader) {
      seriesSquadList.push({
        squadId: element.squadId,
        squadType: element.squadType,
        imageId: element.imageId,
        teamId: element.teamId,
      });
    }
  });

  return seriesSquadList;
};

exports.UpdateSeriesSquadPlayers = async (seriesId, squads) => {
  let output = [];
  for (let i = 0; i < squads.length; i++) {
    let response = await GetSquadPlayersHelper(seriesId, squads[i].squadId);
    let playerIds = [];
    response.data.response.player.forEach((element) => {
      if (!element.isHeader) {
        playerIds.push(element.id);
      }
    });

    let playerIdList = await httpHelper.DMHelper("players", "id", playerIds);
    output.push({ squadId: squads[i].squadId, players: playerIdList });
  }

  return output;
};

async function GetSquadPlayersHelper(seriesId, squadId) {
  const options = {
    method: "GET",
    url: `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-series-squad-players/${seriesId}/${squadId}`,
  };
  let response = await axios.request(options);
  return response;
}
