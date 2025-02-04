const axios = require('axios')

exports.CreatePlayerHelper = async (seriesId,squadId) => {
    console.log(seriesId, squadId)
    const options = {
        method: "GET",
        url: `http://localhost:4000/api/v1/get-series-squad-players/${seriesId}/${squadId}`,
      };
    let response = await axios.request(options);
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
                    playerId : 1,
                    name : element.name,
                    role : element.role,
                    battingStyle : element.battingStyle,
                    bowlingStyle : element.bowlingStyle,
                }
                if(count == 1){
                    dataObject.roleType = "Batsman"
                    output.push(dataObject)
                }else if(count == 2){
                    dataObject.roleType = "AllRounder"
                    output.push(dataObject)
                }else if(count == 3){
                    dataObject.roleType = "WicketKeeper"
                    output.push(dataObject)
                }else if(count == 4){
                    dataObject.roleType = "Bowler"
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
    console.log(seriesId)
    const options = {
        method: "GET",
        url: `http://localhost:4000/api/v1/get-series-squad/${seriesId}`,
      };
    let response = await axios.request(options);

    if(response.data && response.data.response.squads.length > 0){
        return response.data;
    }
    return false;
}

exports.CreatePlayerHelperWithoutSquadId = async (seriesId, data) =>{
    let output = []
    //console.log(data.response.squads)
    data.response.squads.forEach( async element => {
        if(!element.isHeader){
            setInterval(async () => {
                var response = await this.CreatePlayerHelper(seriesId, element.squadId)
                console.log(response)  
                output.push(response)
            }, 10000);
        }
    });
    return output
}