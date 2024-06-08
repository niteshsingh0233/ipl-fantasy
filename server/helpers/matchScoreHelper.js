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
      const batsmanPoints = scoresData.batsmanScoreArray.map((batsman) => {
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
        return {
          teamName: batsman.teamName,
          batsmanName: batsman.batsmanName,
          totalPoints: points,
        };
      });

      const bolwerPoints = scoresData.bowlerWicketArray.map((bowler) => {
        let wicketPoint = bowler.wicketsTaken * 25;
        let economyPoint = bowler.economy < 7 && bowler.overs > 3 ? 30 : 0;
        let maidenPoint = bowler.maidens > 0 ? bowler.maidens * 50 : 0;
        let runsPunishedPoint = bowler.runsPunished >= 45 ? 50 : 0;

        let points =
          wicketPoint + economyPoint + maidenPoint - runsPunishedPoint;

        return {
          teamName: bowler.teamName,
          bolwerName: bowler.bowlerName,
          totalPoints: points,
        };
      });
      return { batsmanPoints, bolwerPoints };
    });

    let playersPoints = [];
    const calculatedPointData = playerPoints.map((playersData) => {
      playersData.batsmanPoints.map((batsman) => {
        playerPoints.push({
          teamName: batsman.teamName,
          playerName: batsman.batsmanName,
          totalPoints: batsman.totalPoints,
        });
      });

      playersData.bolwerPoints.map((bowler) => {
        playerPoints.push({
          teamName: bowler.teamName,
          playerName: bowler.bowlerName,
          totalPoints: bowler.totalPoints,
        });
      });

      return playerPoints;
    });

    return {
      teams,
      teamPoint,
      manOfMatch,
      playersScoreData,
      playerPoints,
      calculatedPointData,
      playersPoints,
    };
  } catch (error) {
    console.error(error);
  }
};
