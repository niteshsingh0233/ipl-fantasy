const axios = require('axios')

exports.PlayerHelper = async (seriesId,squadId) => {
    console.log(seriesId, squadId)
    const options = {
        method: "GET",
        url: `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-series-squad-players/${seriesId}/${squadId}`,
      };
    let response = await axios.request(options);
    console.log(response.data.response.player)
    if(response.data && response.data.response.player.length > 0){
        let output = []
        let count = 0
        response.data.response.player.forEach(element => {
            if(element.name === "BATTERS" && count != 1){
                count = 1;
            }else if(element.name === "ALL ROUNDERS" && count != 2){
                count = 2;
            }else if(element.name === "WICKET KEEPERS" && count != 3){
                count = 3;
            }else if(element.name === "BOWLERS" && count != 4){
                count = 4;
            }

            if(!element.isHeader){
                let dataObject = {
                    id : element.id,
                    playerId : element.id.toString(),
                    name : element.name,
                    role : element.role,
                    battingStyle : element.battingStyle,
                    bowlingStyle : element.bowlingStyle,
                    imageId : element.imageId
                }
                if(count == 1){
                    dataObject.roleType = "Batsman"
                    dataObject.isBatsman = true
                    output.push(dataObject)
                }else if(count == 2){
                    dataObject.roleType = "AllRounder"
                    dataObject.isAllRounder = true
                    output.push(dataObject)
                }else if(count == 3){
                    dataObject.roleType = "WicketKeeper"
                    dataObject.isWicketKeeper = true
                    output.push(dataObject)
                }else if(count == 4){
                    dataObject.roleType = "Bowler"
                    dataObject.isBowler = true
                    output.push(dataObject)
                }
            }
        });
        //return response.data
        return output;
    }
    return false;
}

exports.GetSeriesIdTeamAndSquadId = async (seriesId) =>{
    //console.log(seriesId)
    const options = {
        method: "GET",
        url: `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-series-squad/${seriesId}`,
      };
    let response = await axios.request(options);

    if(response.data && response.data.response.squads.length > 0){
        return response.data;
    }
    return false;
}

exports.CreatePlayerHelperWithoutSquadId = async (seriesId, data) =>{
    let output = []
    //console.log(data.response)
    for(let i = 0; i< data.response.squads.length; i++){
        if(!data.response.squads[i].isHeader){
            
                var response = await this.PlayerHelper(seriesId, data.response.squads[i].squadId)
                //console.log(response)  
                response.forEach(element => {
                    output.push(element)
                });
        }
    }
    
    return output
}

exports.GetPlayerDetailsHelper = async (playerId) =>{
    const options = {
        method: "GET",
        url: `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-player-info-details/${playerId}`,
      };
    let response = await axios.request(options);
    if(response && response.data && response.data.response){
        let playerData = response.data.response
        return {
            id : playerData.id,
            name : playerData.name,
            role : playerData.role,
            imageId : playerData.faceImageId
        }
    }
}

exports.GetPlayerImageDetailsHelper = async (imageId) => {
    const options = {
        method: "GET",
        url: `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${imageId}/i.jpg?p=de&d=high`,
        headers: {
          "x-rapidapi-key": "0f8816f6a3msh904dd1653581039p1a48d8jsnba7150df49a5",
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
        },
      };
    
      try {
        const response = await axios.request(options);
        if(response && response.data){
            return response.data
        }
      } catch (error) {
        console.error(error);
      }
}