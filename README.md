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

Action Plan -:
create playersDb, teamsDb, venuesDb, seriesDb with all the necessary data in db.


if(isAdmin || isDeactivate)
calcuate my point ( only once after match results are out.)
swap players and captain from website only.