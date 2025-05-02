const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const httpHelper = require("./httpHelper.js");
const { randomUUID } = require("crypto");

exports.GetPlayingXIFromMatchId = async (match) => {
    try{
        var players = {}
        var playersList = []

        for (const teamId of match.teamIds) {
            let playingXIData = await httpHelper.GetAsync(
                `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/matches/get-team/playingXI/${match.matchId}/${teamId}`
            );

            // console.log(playingXIData.data)
            if(playingXIData.data && playingXIData.data.isSuccess){
                const players = playingXIData.data.getPlayingXIForMatchForTeam.players
                if(players.Squad){
                    players.Squad.forEach((player) => {
                        playersList.push({
                            playerId: player.id,
                            playerName: player.name,
                            playingStyle: player.role == "Batsman" || player.role == "Bowler" ? player.role.toUpperCase() :
                            player.role.includes("Allrounder") ? "ALLROUNDER" : player.role.includes("WK") ? "WICKETKEEPER" : "NA",
                            isInPlayingXI: false,
                            playerBuyingPoint: 9,
                            playerFantasyPoint: 0,
                            playerTeamId : player.teamId

                        });
                    })

                }else if(players.bench && players["playing XI"]){
                    players.bench.forEach((player) => {
                        if(!player.isSupportStaff){
                            playersList.push({
                                playerId : player.id,
                                playerName : player.name,
                                playingStyle : player.role == "Batsman" || player.role == "Bowler" ? player.role.toUpperCase() :
                                player.role.includes("Allrounder") ? "ALLROUNDER" : player.role.includes("WK") ? "WICKETKEEPER" : "NA",
                                isInPlayingXI : false,
                                playerBuyingPoint : 9,
                                playerFantasyPoint : 0,
                                playerTeamId : player.teamId
                            })
                        }
                    })
                    players["playing XI"].forEach((player) => {
                        playersList.push({
                            playerId : player.id,
                            playerName : player.name,
                            playingStyle : player.role == "Batsman" || player.role == "Bowler" ? player.role.toUpperCase() :
                            player.role.includes("Allrounder") ? "ALLROUNDER" : player.role.includes("WK") ? "WICKETKEEPER" : "NA",
                            isInPlayingXI : true,
                            playerBuyingPoint : 9,
                            playerFantasyPoint : 0,
                            playerTeamId : player.teamId
                        })
                    })

                    // console.log(playersList)
                    
                }
            }
                  
        };

        players.playersList = playersList
        // console.log(players)
        return players

    }catch(error){
        console.log(error.message)
    }
}