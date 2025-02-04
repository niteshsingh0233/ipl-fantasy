const express = require('express')
const {CreatePlayerHelper, GetSeriesIdTeamAndSquadId, CreatePlayerHelperWithoutSquadId} = require('../helpers/createPlayerHelper.js')
const PlayerModel = require('../models/createPlayerModel.js')

exports.CreatePlayerController = async (req,res) => {
    try {
        const {seriesId, squadId} = req.query
        if(!seriesId || !squadId){
            res.status(500).json({
                message : 'CreatePlayerController seriesId or squadId is empty.'
            })
            return;
        }

        if(squadId == 0){
            console.log('hi')
            var responseData = await GetSeriesIdTeamAndSquadId(seriesId);
            var response = await CreatePlayerHelperWithoutSquadId(seriesId, responseData) 


        }else {
            console.log('hi2')
            var response = await CreatePlayerHelper(seriesId, squadId);
        }

        var count = 0
        var responseArray = response.map((element) => {
            count++;
            let obj = {}
            obj.id = element.id,
            obj.playerId = element.playerId,
            obj.playerName = element.name,
            obj.playerRole = element.role,
            obj.playerBattingStyle = element.battingStyle,
            obj.playerBowlingStyle = element.bowlingStyle,
            obj.playerRoleType = element.roleType,
            obj.isWicketKeeper = false,
            obj.isAllRounder = true,
            obj.isBatsman = true,
            obj.isBowler = true

            return obj;
        })

        //var out = await PlayerModel.insertMany(responseArray);

        res.status(201).json({
            message : 'CreatePlayerController success.',
            count
            // query : req.query,
            // response : response,
            // out
        })
    } catch (error) {
        res.status(500).json({
            message : 'CreatePlayerController failed.',
            error : error
        })
    }
}