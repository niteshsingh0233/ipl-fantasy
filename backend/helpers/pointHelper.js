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