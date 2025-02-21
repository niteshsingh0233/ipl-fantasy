const axios = require("axios");
const match = require('../models/matchModel')
const { randomUUID } = require("crypto");

exports.MatchListFromSeriesId = async (seriesId) => {
  console.log(seriesId);
  const options = {
    method: "GET",
    url: `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-series-matches-list/${seriesId}`,
  };
  let response = await axios.request(options);
  //console.log(response.data)
  if (response.data && response.data.response.matchDetails.length > 0) {
    let output = [];
    let count = 0;
    //console.log(response.data.response)
    response.data.response.matchDetails.forEach((element) => {
      
      if(element.matchDetailsMap != null){
        element.matchDetailsMap.match.forEach((ele) => {
          console.log(ele)
          let matchInfo = ele.matchInfo
          let dataObject = {
            documentCode : randomUUID().toString("hex"),
            id : matchInfo.matchId,
            matchId : matchInfo.matchId.toString(),
            seriesId : matchInfo.seriesId,
            date : element.key,
            seriesName : matchInfo.seriesName,
            matchDesc : matchInfo.matchDesc,
            matchFormat : matchInfo.matchFormat,
            startDate : matchInfo.startDate,
            endDate : matchInfo.endDate,
            state : matchInfo.state,
            status : matchInfo.status,
            team1 : {
              teamId:matchInfo.team1.teamId,
              teamName : matchInfo.team1.teamName,
              teamSName : matchInfo.team1.teamSName,
              imageId : matchInfo.team1.imageId,
            },
            teamIds : [matchInfo.team1.teamId, matchInfo.team2.teamId],
            team2 : {
              teamId:matchInfo.team2.teamId,
              teamName : matchInfo.team2.teamName,
              teamSName : matchInfo.team2.teamSName,
              imageId : matchInfo.team2.imageId,
            },
            venueInfo : {
              id : matchInfo.venueInfo.id,
              ground : matchInfo.venueInfo.ground,
              city : matchInfo.venueInfo.city,
              timezone : matchInfo.venueInfo.timezone
            },
            venueInfoId : matchInfo.venueInfo.id,
            currBatTeamId : '',
           
          };
        output.push(dataObject);
        })
      }
        
    });
    //return response.data
    return output;
  }
  return false;
};