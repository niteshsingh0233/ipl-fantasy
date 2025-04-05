# ipl-fantasy

## underscore.js

>Players and teams db won't have any ipl fantasy related data.
Db Names -:
ownersDb -: ( dependent on gameDb )
playersDb -: independent
teamsDb -: independent ( depends on players )
pointsDb -: ( dependent on ownerDb and gameDb)
seriesDb -: independent ( depends on venue, player and team db, match db )
matchDb -: dependent on series
venuesDb -: independent
gameDb -: ( it is superset of ownerDb, pointsDb, pointsRuleEngineDb )
pointsRuleEngineDb ( dependent on gameDb )
userDb
auctionDb

Action Plan -:
create playersDb, teamsDb, venuesDb, seriesDb with all the necessary data in db.


if(isAdmin || isDeactivate)
calcuate my point ( only once after match results are out.)
swap players and captain from website only.



UI -: 
signin, signout, 
admin -: getAllUsers, createGame
sendRequestToBecomeAdmin,
users -: joinGame, createOwner, ( add retained Players, add screenshot )
viewGameUsers and their team and playingX1 and everything.
and leaderboard also, and recent changes or swaps done.
cdsDb
localizationdb


regarding auction -: 
list of all players
filtered and sorted by batsman, bowler, fielder and allRounder
random number generator
addPlayerToOwner



ruleEngineObj -: gameId, 
properties and its json path from cds canonical structure.
actions -: miltiply and divide and add and substract


const sampleSchema = new Schema({ name: { type: String, required: true } });
console.log(sampleSchema.path('name'));


documentCode : will be used for ref.
id : cricbuzz

05.04.2025

Points system -: 
Total points for the team for all matches -: fantasyPoint
total points for the team for every match in an array -: fantasyPoint Array
total points for the player for every match and for all matches -: playerPoints
current playing x1 for each match have to save -: fantasyPoint


player Swapping logic -: 
captain swap logic have to add
vice captain swap logic have to add
player swap logic have to add

//
based on game rules we can modify the playing x1 combination for the owners.

// game rule engine have to add according to current playing scenario and their properties.

have to take from praveen the list of players sold in the auction.

*PointDb -:* 
pointId, matchId, matchNo, teamIds, venueId, playingX1 and their points, ownerPoints -: array of objects : matchNo, teamOwner, teamName, iplTeamName, previousMatchPoint, currentMatchPoint, previousTotalPoint, overallPoint, currentPlayingX1ForTheOwner, captain, viceCaptain

*gameDb -> fantasyPoint -: array of objects*
matchNo, teamOwner, teamName, iplTeamName, previousMatchPoint, currentMatchPoint, previousTotalPoint, overallPoint, currentPlayingX1, captain, viceCaptain, fantasyPointHistory array based on matches.
*gameDb -> playerPoints -: array of object*
matchNo, playersList : array of objects : {playerName, playerId, totalPointForTheMatch}, playerPointsHistory array based on matches

**owner should have totalFantasyPoint property.**

Above 4 details should be updated after the match, first we will calculate the matchPoints and after calculating it will internally call an API which will add entry in pointDb, gameDb ( fantasyPoint, playerPoints, ownerTotalFantasyPoint )

Task for 06.04.2025 -:
Take excel from praveen for our auction and create Game for IPL
write point calculation logic and calculation of scores and above 4 point code logic.

We should add a check that if point is already calculated for the match then if we hit the api it should return saying point already calculated.

Also, create a one match game style just like dream11 where they can join the game and play the match and win it.


// local up
export default function APIBASEURL(){
    return 'http://localhost:6969'//'https://fantasy-app-chi.vercel.app'
}

origin: "http://localhost:5173",//"https://fantasy-app-ui.vercel.app",
