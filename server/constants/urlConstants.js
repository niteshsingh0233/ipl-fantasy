const URLConstants = {
  SERIES_LIST_INTERNATIONAL:
    "https://cricbuzz-cricket.p.rapidapi.com/series/v1/international",
  SERIES_LIST_LEAGUE:
    "https://cricbuzz-cricket.p.rapidapi.com/series/v1/league",
  SERIES_LIST_DOMESTIC:
    "https://cricbuzz-cricket.p.rapidapi.com/series/v1/domestic",
  SERIES_LIST_WOMEN: "https://cricbuzz-cricket.p.rapidapi.com/series/v1/women",
  SERIES_LIST_ARCHIVES_INTERNATIONAL:
    "https://cricbuzz-cricket.p.rapidapi.com/series/v1/archives/international",
  SERIES_LIST_ARCHIVES_LEAGUE:
    "https://cricbuzz-cricket.p.rapidapi.com/series/v1/archives/league",
  SERIES_LIST_ARCHIVES_DOMESTIC:
    "https://cricbuzz-cricket.p.rapidapi.com/series/v1/archives/domestic",
  SERIES_LIST_ARCHIVES_WOMEN:
    "https://cricbuzz-cricket.p.rapidapi.com/series/v1/archives/women",
  SERIES_LIST_MATCHES_LIST: "https://cricbuzz-cricket.p.rapidapi.com/series/v1",
  SERIES_SQUAD_LIST: "https://cricbuzz-cricket.p.rapidapi.com/series/v1",
  SERIES_SQUAD_PLAYERS_LIST:
    "https://cricbuzz-cricket.p.rapidapi.com/series/v1",
  SERIES_VENUES_LIST: "https://cricbuzz-cricket.p.rapidapi.com/series/v1",
  SERIES_STAT_FILTERS_LIST:
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series",
  SERIES_GET_STAT_DETAILS:
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/7607?statsType=mostRuns",
  MATCHES_LIST_RECENT:
    "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent",
  MATCHES_LIST_LIVE: "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",
  MATCHES_LIST_UPCOMING:
    "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming",
  MATCHES_GET_SCORECARDV2: "https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1",
  TEAM_LIST_INTERNATIONAL:
    "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international",
  TEAM_LIST_LEAGUE: "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/league",
  TEAM_LIST_DOMESTIC:
    "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/domestic",
  TEAM_LIST_WOMEN: "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/women",
  TEAM_GET_SCHEDULE:
    "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/2/schedule",
  TEAM_GET_RESULTS:
    "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/2/results",
  TEAM_GET_NEWS: "https://cricbuzz-cricket.p.rapidapi.com/news/v1/team/2",
  TEAM_GET_PLAYERS:
    "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/2/players",
  TEAM_GET_STAT_FILTERS:
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/team/2",
  TEAM_GET_STAT_FILTERS_DETAILS:
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/team/2?statsType=mostRuns&year=2024&matchType=3&team=2&opponent=3",
  GET_VENUE_INFO: "https://cricbuzz-cricket.p.rapidapi.com/venues/v1/45",
  GET_VENUE_STATS: "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/venue/24",
  GET_VENUE_MATCHES:
    "https://cricbuzz-cricket.p.rapidapi.com/venues/v1/45/matches",
  GET_PLAYER_TRENDING_LIST:
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/trending",
  GET_PLAYER_CAREER_DETAILS:
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/8733/career",
  GET_PLAYER_NEWS:
    "https://cricbuzz-cricket.p.rapidapi.com/news/v1/player/8733",
  GET_PLAYER_BOWLING_DETAILS:
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/8733/bowling",
  GET_PLAYER_BATTING_DETAILS:
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/8733/batting",
  GET_PLAYER_INFO_DETAILS:
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/",
  GET_PLAYER_SEARCH:
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search?plrN=Virat",
  GET_TEAM_PLAYINGXI_FOR_MATCHID:
    "https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/matchIdReplace/team/teamIdReplace",
  GET_OVER_DETAILS_FOR_MATCH_AND_INNING:
    "https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/matchIdReplace/overs" 
};

const SERIESLIST = {
  1: "SERIES_LIST_INTERNATIONAL",
  2: "SERIES_LIST_LEAGUE",
  3: "SERIES_LIST_DOMESTIC",
  4: "SERIES_LIST_WOMEN",
};

const SERIESLISTARCHIVES = {
  1: "SERIES_LIST_ARCHIVES_INTERNATIONAL",
  2: "SERIES_LIST_ARCHIVES_LEAGUE",
  3: "SERIES_LIST_ARCHIVES_DOMESTIC",
  4: "SERIES_LIST_ARCHIVES_WOMEN",
};

const MATCHESLIST = {
  1: "MATCHES_LIST_RECENT",
  2: "MATCHES_LIST_LIVE",
  3: "MATCHES_LIST_UPCOMING",
};

const TEAMLIST = {
  1: "TEAM_LIST_INTERNATIONAL",
  2: "TEAM_LIST_LEAGUE",
  3: "TEAM_LIST_DOMESTIC",
  4: "TEAM_LIST_WOMEN",
};

module.exports = {
  SERIESLIST,
  URLConstants,
  SERIESLISTARCHIVES,
  MATCHESLIST,
  TEAMLIST,
};
