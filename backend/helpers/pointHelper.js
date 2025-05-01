const axios = require("axios");

exports.GetMatchScore = async (matchId) => {
  const options = {
    method: "GET",
    url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/scard`,
    headers: {
      "x-rapidapi-key": "0f8816f6a3msh904dd1653581039p1a48d8jsnba7150df49a5",
      "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    if (!response) {
      return response;
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


exports.calculatePlayerPoints = (matchScore) => {
  try {
    matchScore = matchScore.getMatchScoreV2
    const teams = matchScore.matchHeader.matchTeamInfo.map((matchTeam) => {
      return matchTeam.battingTeamShortName;
    });
    const teamPoint = {
      teamName: matchScore.matchHeader.result.winningTeam,
      teamPoints: 100,
    };
    const manOfMatch = {
      playerName: matchScore.matchHeader.playersOfTheMatch.map((player) => {
        return player.fullName;
      })[0],
      pointsEarned: 50,
    };
    const playersScoreData = matchScore.scoreCard.map((scores) => {
      const battingTeamName = scores.batTeamDetails.batTeamName;

      const batsmanScores = scores.batTeamDetails.batsmenData;

      const batsmanScoreArray = [];

      for (var batsmanData in batsmanScores) {
        const batsman = batsmanScores[batsmanData];
        batsmanScoreArray.push({
          teamName: battingTeamName,
          batsmanName: batsman.batName,
          runs: batsman.runs,
          balls: batsman.balls,
          fours: batsman.fours,
          sixes: batsman.sixes,
          strikeRate: batsman.strikeRate,
          isOut: batsman.wicketCode == "" ? false : true,
        });
      }

      const bowlingTeamName = scores.bowlTeamDetails.bowlTeamName;

      const bowlerWickets = scores.bowlTeamDetails.bowlersData;

      const bowlerWicketArray = [];

      for (var bowlerData in bowlerWickets) {
        const bowler = bowlerWickets[bowlerData];
        bowlerWicketArray.push({
          teamName: bowlingTeamName,
          bowlerName: bowler.bowlName,
          overs: bowler.overs,
          maidens: bowler.maidens,
          runsPunished: bowler.runs,
          wicketsTaken: bowler.wickets,
          economy: bowler.economy,
        });
      }

      return {
        battingTeamName,
        batsmanScoreArray,
        bowlingTeamName,
        bowlerWicketArray,
      };
    });

    const playerPoints = playersScoreData.map((scoresData) => {
      const batsmanPoints = [];
      scoresData.batsmanScoreArray.map((batsman) => {
        let points = 0;
        points =
          points + batsman.runs < 50
            ? batsman.runs
            : batsman.runs >= 85
            ? batsman.runs * 3
            : batsman.runs * 2 + batsman.fours * 5 + batsman.sixes * 10;

        let notOutPoint = !batsman.isOut && batsman.balls > 0 ? 10 : 0;
        points = points + notOutPoint;
        if (batsman.runs == 0 && batsman.isOut) {
          let outOnZero = 50;
          points = points - outOnZero;
        }
        batsmanPoints.push({
          teamName: batsman.teamName,
          batsmanName: batsman.batsmanName,
          totalPoints: points,
        });
      });

      const bowlerPoints = [];
      scoresData.bowlerWicketArray.map((bowler) => {
        let wicketPoint = bowler.wicketsTaken * 25;
        let economyPoint = bowler.economy < 7 && bowler.overs > 3 ? 30 : 0;
        let maidenPoint = bowler.maidens > 0 ? bowler.maidens * 50 : 0;
        let runsPunishedPoint = bowler.runsPunished >= 45 ? 50 : 0;

        let points =
          wicketPoint + economyPoint + maidenPoint - runsPunishedPoint;

        bowlerPoints.push({
          teamName: bowler.teamName,
          bowlerName: bowler.bowlerName,
          totalPoints: points,
        });
      });
      return { batsmanPoints, bowlerPoints };
    });

    let finalPoints = [];
    const calculatedPointData = playerPoints.map((playersData) => {
      playersData.batsmanPoints.map((batsman) => {
        finalPoints.push({
          teamName: batsman.teamName,
          playerName: batsman.batsmanName,
          totalPoints: batsman.totalPoints,
        });
      });
      playersData.bowlerPoints.map((bowler) => {
        finalPoints.push({
          teamName: bowler.teamName,
          playerName: bowler.bowlerName,
          totalPoints: bowler.totalPoints,
        });
      });
    });

    let pointsCalculated = [];
    finalPoints.forEach((element) => {
      let index = pointsCalculated.findIndex((data) => {
        return (
          data.playerName == element.playerName ||
          data.playerName.includes(element.playerName.split(" ")[0]) ||
          element.playerName.includes(data.playerName.split(" ")[0])
        );
      });

      if (index && index < 0) {
        pointsCalculated.push(element);
      } else {
        pointsCalculated[index].totalPoints =
          pointsCalculated[index].totalPoints + element.totalPoints;
      }
    });

    console.log(pointsCalculated.length);
    return {
      teams,
      teamPoint,
      manOfMatch,
      playersScoreData,
      playerPoints,
      finalPoints,
      pointsCalculated,
    };
  } catch (error) {
    console.error(error);
  }
};

exports.GetMatchScoreV2 = async (matchId) => {
  const options = {
    method: "GET",
    url: `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-match-score/${matchId}`,
  };

  try {
    const response = await axios.request(options);
    if (!response) {
      return response;
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

exports.calculatePlayerPointsV2 = (matchScore) => {
  try {
    matchScore = matchScore.getMatchScoreV2
    const teams = matchScore.matchHeader.matchTeamInfo.map((matchTeam) => {
      return matchTeam.battingTeamShortName;
    });
    const teamPoint = {
      teamName: matchScore.matchHeader.result.winningTeam,
      teamId: matchScore.matchHeader.result.winningteamId,
      teamPoints: 100,
    };
    const manOfMatch = {
      playerName: matchScore.matchHeader.playersOfTheMatch.map((player) => {
        return player.fullName;
      })[0],
      playerId : matchScore.matchHeader.playersOfTheMatch.map((player) => {
        return player.id;
      }),
      pointsEarned: 50,
    };
    const playersScoreData = matchScore.scoreCard.map((scores) => {
      const battingTeamName = scores.batTeamDetails.batTeamName;

      const batsmanScores = scores.batTeamDetails.batsmenData;

      const batsmanScoreArray = [];

      for (var batsmanData in batsmanScores) {
        const batsman = batsmanScores[batsmanData];
        batsmanScoreArray.push({
          teamName: battingTeamName,
          batsmanId : batsman.batId,
          batsmanName: batsman.batName,
          runs: batsman.runs,
          balls: batsman.balls,
          fours: batsman.fours,
          sixes: batsman.sixes,
          strikeRate: batsman.strikeRate,
          isOut: batsman.wicketCode == "" ? false : true,
          isKeeper : batsman.isKeeper,
          wicketCode : batsman.wicketCode,
          bowlerId : batsman.bowlerId,
          fielderId1 : batsman.fielderId1
        });
      }

      const bowlingTeamName = scores.bowlTeamDetails.bowlTeamName;

      const bowlerWickets = scores.bowlTeamDetails.bowlersData;

      const bowlerWicketArray = [];

      for (var bowlerData in bowlerWickets) {
        const bowler = bowlerWickets[bowlerData];
        bowlerWicketArray.push({
          teamName: bowlingTeamName,
          bowlerId : bowler.bowlerId,
          bowlerName: bowler.bowlName,
          overs: bowler.overs,
          maidens: bowler.maidens,
          runsPunished: bowler.runs,
          wicketsTaken: bowler.wickets,
          economy: bowler.economy,
        });
      }

      return {
        battingTeamName,
        batsmanScoreArray,
        bowlingTeamName,
        bowlerWicketArray,
      };
    });

    let playersTakenCatch = []
    let wkDoneStumping = []
    const catchAndStumpingPlayerArray = playersScoreData.map((scoresData) => {
      scoresData.batsmanScoreArray.map((batsman) => {
        if(batsman.isOut){
          if(batsman.wicketCode === "CAUGHT"){
            playersTakenCatch.push(batsman.fielderId1)
          }
          else if(batsman.wicketCode === "STUMPED"){
            wkDoneStumping.push(batsman.fielderId1)
          }
          else if(batsman.wicketCode === "CAUGHTBOWLED"){
            playersTakenCatch.push(batsman.bowlerId)
          }
        }
      });

    })

    const playerPoints = playersScoreData.map((scoresData) => {
      const batsmanPoints = [];
      scoresData.batsmanScoreArray.map((batsman) => {
        let points = 0;
        points =
          points + batsman.runs < 25
            ? batsman.runs
            : batsman.runs >= 25 && batsman.runs < 50
            ? batsman.runs * 1.5
            : batsman.runs >= 50 && batsman.runs < 75
            ? batsman.runs * 2
            : batsman.runs >= 75 && batsman.runs < 100
            ? batsman.runs * 3 : batsman.runs * 4

        let notOutPoint = !batsman.isOut && batsman.balls > 0 ? 10 : 0;
        points = points + notOutPoint;
        if (batsman.runs == 0 && batsman.isOut) {
          let outOnZero = 50;
          points = points - outOnZero;
        }

        let catchPoint = 0
        if(playersTakenCatch.includes(batsman.batsmanId)){
          let bowlerIdArray = playersTakenCatch.filter((id) => id == batsman.batsmanId)
          playersTakenCatch = playersTakenCatch.filter((id) => id != batsman.batsmanId)
          catchPoint = bowlerIdArray.length * 10
        }
        let stumpingPoint = 0
        if(wkDoneStumping.includes(batsman.batsmanId)){
          let bowlerIdArray = wkDoneStumping.filter((id) => id == batsman.batsmanId)
          wkDoneStumping = wkDoneStumping.filter((id) => id != batsman.batsmanId)
          stumpingPoint = bowlerIdArray.length * 20
        }

        points = points + catchPoint + stumpingPoint

        batsmanPoints.push({
          teamName: batsman.teamName,
          batsmanId : batsman.batsmanId,
          batsmanName: batsman.batsmanName,
          totalPoints: points,
        });
      });

      const bowlerPoints = [];
      scoresData.bowlerWicketArray.map((bowler) => {
        let wicketPoint = bowler.wicketsTaken == 1 
        ? bowler.wicketsTaken * 25
        : bowler.wicketsTaken == 2 
        ? bowler.wicketsTaken * 25 * 1.5
        : bowler.wicketsTaken == 3
        ? bowler.wicketsTaken * 25 * 2
        : bowler.wicketsTaken == 4
        ? bowler.wicketsTaken * 25 * 3
        : bowler.wicketsTaken * 25 * 4 ;
        let maidenPoint = bowler.maidens > 0 ? bowler.maidens * 50 : 0;
        let runsPunishedPoint = bowler.economy >= 12 && bowler.overs >=2 ? 50 : 0;

        let points =
          wicketPoint + maidenPoint - runsPunishedPoint;

        bowlerPoints.push({
          teamName: bowler.teamName,
          bowlerId : bowler.bowlerId,
          bowlerName: bowler.bowlerName,
          totalPoints: points,
        });
      });
      return { batsmanPoints, bowlerPoints };
    });

    let finalPoints = [];
    const calculatedPointData = playerPoints.map((playersData) => {
      playersData.batsmanPoints.map((batsman) => {
        finalPoints.push({
          teamName: batsman.teamName,
          playerName: batsman.batsmanName,
          totalPoints: batsman.totalPoints,
          playerId : batsman.batsmanId,
        });
      });
      playersData.bowlerPoints.map((bowler) => {
        finalPoints.push({
          teamName: bowler.teamName,
          playerName: bowler.bowlerName,
          totalPoints: bowler.totalPoints,
          playerId : bowler.bowlerId,
        });
      });
    });

    console.log(finalPoints)
    let pointsCalculated = [];
    finalPoints.forEach((element) => {
      let index = pointsCalculated.findIndex((data) => {
        return (
          data.playerId == element.playerId
          // data.playerName == element.playerName || (
          // data.playerName.includes(element.playerName.split(" ")[0]) ||
          // element.playerName.includes(data.playerName.split(" ")[0]) )
        );
      });

      if (index && index < 0) {
        pointsCalculated.push(element);
      } else {
        pointsCalculated[index].totalPoints =
          pointsCalculated[index].totalPoints + element.totalPoints;
      }
    });

    console.log(finalPoints)

    console.log(pointsCalculated.length);
    return {
      teams,
      teamPoint,
      manOfMatch,
      playersScoreData,
      playerPoints,
      finalPoints,
      pointsCalculated,
    };
  } catch (error) {
    console.error(error);
  }
};

exports.GetMatchScoreForCalculateMatchPoints = (matchScore) => {

  matchScore = matchScore.getMatchScoreV2
  const teams = matchScore.matchHeader.matchTeamInfo.map((matchTeam) => {
    return matchTeam.battingTeamShortName;
  });
  const teamPoint = {
    teamName: matchScore.matchHeader.result.winningTeam,
    teamId: matchScore.matchHeader.result.winningteamId,
  };
  const manOfMatch = {
    playerName: matchScore.matchHeader.playersOfTheMatch.map((player) => {
      return player.fullName;
    })[0],
    playerId : matchScore.matchHeader.playersOfTheMatch.map((player) => {
      return player.id;
    })[0],
  };
  
  var playersScoreData = []
  var playersList = []

  var playersScoreDataObject = {}

  matchScore.scoreCard.forEach((scores) => {

    const battingTeamName = scores.batTeamDetails.batTeamName;
    const batsmanScores = scores.batTeamDetails.batsmenData;
    for (var batsmanData in batsmanScores) {
      const batsman = batsmanScores[batsmanData];
      playersScoreData.push({
        teamName: battingTeamName,
        batsmanId : batsman.batId,
        batsmanName: batsman.batName,
        runs: batsman.runs,
        balls: batsman.balls,
        fours: batsman.fours,
        sixes: batsman.sixes,
        strikeRate: batsman.strikeRate,
        isOut: batsman.wicketCode == "" ? false : true,
        isKeeper : batsman.isKeeper,
        wicketCode : batsman.wicketCode,
        bowlerId : batsman.bowlerId,
        fielderId1 : batsman.fielderId1
      });

      if(playersScoreDataObject[batsman.batId] == undefined){
        playersScoreDataObject[batsman.batId] = {}
        playersScoreDataObject[batsman.batId]["catchCount"] = 0
        playersScoreDataObject[batsman.batId]["stumpingCount"] = 0
        playersList.push(batsman.batId)
      }
      playersScoreDataObject[batsman.batId]["batting"] = {
        teamName: battingTeamName,
        batsmanId : batsman.batId,
        batsmanName: batsman.batName,
        runs: batsman.runs,
        balls: batsman.balls,
        fours: batsman.fours,
        sixes: batsman.sixes,
        strikeRate: batsman.strikeRate,
        isOut: batsman.wicketCode == "" ? false : true,
        isKeeper : batsman.isKeeper,
        wicketCode : batsman.wicketCode,
        bowlerId : batsman.bowlerId,
        fielderId1 : batsman.fielderId1
      };
    }

    

    const bowlingTeamName = scores.bowlTeamDetails.bowlTeamName;

    const bowlerWickets = scores.bowlTeamDetails.bowlersData;

    for (var bowlerData in bowlerWickets) {
      const bowler = bowlerWickets[bowlerData];
      playersScoreData.push({
        teamName: bowlingTeamName,
        bowlerId : bowler.bowlerId,
        bowlerName: bowler.bowlName,
        overs: bowler.overs,
        maidens: bowler.maidens,
        runsPunished: bowler.runs,
        wicketsTaken: bowler.wickets,
        economy: bowler.economy,
      });

      if(playersScoreDataObject[bowler.bowlerId] == undefined){
        playersScoreDataObject[bowler.bowlerId] = {}
        playersScoreDataObject[bowler.bowlerId]["catchCount"] = 0
        playersScoreDataObject[bowler.bowlerId]["stumpingCount"] = 0
        playersList.push(bowler.bowlerId)
      }
      playersScoreDataObject[bowler.bowlerId]["bowling"] = {
        teamName: bowlingTeamName,
        bowlerId : bowler.bowlerId,
        bowlerName: bowler.bowlName,
        overs: bowler.overs,
        maidens: bowler.maidens,
        runsPunished: bowler.runs,
        wicketsTaken: bowler.wickets,
        economy: bowler.economy,
      }
    }

    

  })

  playersScoreData.forEach((scoresData) => {
    if(scoresData.isOut){
      if(scoresData.wicketCode === "CAUGHT"){
        console.log(playersScoreDataObject, scoresData.fielderId1)
        playersScoreDataObject[scoresData.fielderId1]["catchCount"] += 1
      }
      else if(scoresData.wicketCode === "STUMPED"){
        playersScoreDataObject[scoresData.fielderId1]["stumpingCount"] += 1
      }
      else if(scoresData.wicketCode === "CAUGHTBOWLED"){
        playersScoreDataObject[scoresData.bowlerId]["catchCount"] += 1
      }
    }
  })

  return {
    teams,
    teamPoint,
    manOfMatch,
    playersScoreData,
    playersScoreDataObject,
    playersList
  };
}

exports.CalculateMatchPointsForOwners = (matchDetails, owners, game) => {
  
  let pointsForMatch = []
  let pointsForMatchObject = {}

  matchDetails.playersList.forEach((playerId) => {
    console.log(playerId)
    var owner = owners.filter((owner) => {
      if(owner.playingXIPlayerId.length > 0 && owner.playingXIPlayerId.includes(playerId)){
        return owner
      }
    })[0]

    console.log(owner)

    if(owner){

      var player = owner.playingXIList.filter((playerData) => {
        return playerData.playerId == playerId;
      })

      var playingType = player[0].playingType

      var fantasyPoint = 0

      var playerData = matchDetails.playersScoreDataObject[playerId]
      if(playerData.batting){
        var battingData = playerData.batting

        fantasyPoint = fantasyPoint + battingData.runs < 25
            ? battingData.runs
            : battingData.runs >= 25 && battingData.runs < 50
            ? battingData.runs * 1.5
            : battingData.runs >= 50 && battingData.runs < 75
            ? battingData.runs * 2
            : battingData.runs >= 75 && battingData.runs < 100
            ? battingData.runs * 3 : battingData.runs * 4

        let notOutPoint = !battingData.isOut && battingData.balls > 0 ? 10 : 0;

        fantasyPoint = fantasyPoint + notOutPoint;

        if (battingData.runs == 0 && battingData.isOut && playingType != "BOWLER") {
          let outOnZero = 50;
          fantasyPoint = fantasyPoint - outOnZero;
        }
      }

      // console.log(player[0].playerName,fantasyPoint)

      if(playerData.bowling){
        var bowlingData = playerData.bowling

        fantasyPoint = fantasyPoint + bowlingData.wicketsTaken == 1 
        ? bowlingData.wicketsTaken * 25
        : bowlingData.wicketsTaken == 2 
        ? bowlingData.wicketsTaken * 25 * 1.5
        : bowlingData.wicketsTaken == 3
        ? bowlingData.wicketsTaken * 25 * 2
        : bowlingData.wicketsTaken == 4
        ? bowlingData.wicketsTaken * 25 * 3
        : bowlingData.wicketsTaken * 25 * 4 ;

        let maidenPoint = bowlingData.maidens > 0 ? bowlingData.maidens * 50 : 0;
        let runsPunishedPoint = bowlingData.economy >= 12 && bowlingData.overs >=2 ? 50 : 0;

        fantasyPoint = fantasyPoint + maidenPoint - runsPunishedPoint;
      }

      
      if(playerData.catchCount && playerData.catchCount > 0){
        fantasyPoint = fantasyPoint + playerData.catchCount * 10
      }

      if(playerData.stumpingCount && playerData.stumpingCount > 0 && playerData.batting.isKeeper
        && playingType == "WICKETKEEPER"){
        fantasyPoint = fantasyPoint + playerData.stumpingCount * 20
      }

      if(matchDetails.manOfMatch.playerId == playerId){
        fantasyPoint = fantasyPoint + 50
      }

      if(owner.captain.captainId == playerId){
        fantasyPoint = fantasyPoint * 2
      }

      if(owner.viceCaptain.viceCaptainId == playerId){
        fantasyPoint = fantasyPoint * 1.5
      }
      // console.log(player[0].playerName,fantasyPoint)
      var teamPoint = 0
      if(matchDetails.teams.includes(owner.teamName) && teams[owner.teamName] == matchDetails.teamPoint.teamName){
        teamPoint = teamPoint + 100
      }

      pointsForMatch.push({
        ownerId : owner._id,
        playerId : playerId,
        playerName : player[0].playerName,
        fantasyPoint : fantasyPoint,
        teamPoint: teamPoint,
        playingType : playingType,
      })

      if(pointsForMatchObject[owner._id] == undefined){
        pointsForMatchObject[owner._id] = {}
        pointsForMatchObject[owner._id]["players"] = []
        pointsForMatchObject[owner._id]["totalFantasyPoint"] = 0
        pointsForMatchObject[owner._id]["totalTeamPoint"] = 0
        pointsForMatchObject[owner._id]["totalPoint"] = 0
      }

      pointsForMatchObject[owner._id]["players"].push({
        ownerId : owner._id,
        playerId : playerId,
        playerName : player[0].playerName,
        fantasyPoint : fantasyPoint,
      })

      pointsForMatchObject[owner._id]["totalFantasyPoint"] = pointsForMatchObject[owner._id]["totalFantasyPoint"] + fantasyPoint

      pointsForMatchObject[owner._id]["totalTeamPoint"] = pointsForMatchObject[owner._id]["totalTeamPoint"] > 0 ? pointsForMatchObject[owner._id]["totalTeamPoint"] : teamPoint

      pointsForMatchObject[owner._id]["totalPoint"] = pointsForMatchObject[owner._id]["totalFantasyPoint"] + pointsForMatchObject[owner._id]["totalTeamPoint"]

    }
  })

  return {pointsForMatch, pointsForMatchObject}
  // return pointsForMatchObject
}


var teams = {
  "CSK": "Chennai Super Kings",
  "DC": "Delhi Capitals",
  "GT": "Gujarat Titans",
  "KKR": "Kolkata Knight Riders",
  "PBKS": "Punjab Kings",
  "MI": "Mumbai Indians",
  "RCB": "Royal Challengers Bengaluru",
  "RR": "Rajasthan Royals",
  "SRH": "Sunrisers Hyderabad",
  "LSG": "Lucknow Super Giants",
  "DC": "Delhi Capitals"
}