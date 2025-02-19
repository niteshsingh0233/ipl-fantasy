const axios = require("axios");
const TeamsList = require("../constants/enumConstants.js");

exports.CreateTeamHelper = async (seriesId, squadId) => {
  console.log(seriesId, squadId);
  const options = {
    method: "GET",
    url: `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-team-list/2`,
  };
  let response = await axios.request(options);
  if (response.data && response.data.getTeamListDetails.list.length > 0) {
    let output = [];
    let count = 0;
    response.data.getTeamListDetails.list.forEach((element) => {
      if (element.teamId && TeamsList.includes(element.teamSName)) {
        let dataObject = {
          teamId: element.teamId,
          teamName: element.teamName,
          teamSName: element.teamSName,
          imageId: element.imageId,
          countryName: element.countryName,
          belongsTo: element.belongsTo,
        };

        output.push(dataObject);
      }
    });
    //return response.data
    return output;
  }
  return false;
};
