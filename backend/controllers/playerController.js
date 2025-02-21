const express = require('express')
const {PlayerHelper, GetSeriesIdTeamAndSquadId, CreatePlayerHelperWithoutSquadId} = require('../helpers/playerHelper.js')
const PlayerModel = require('../models/playerModel.js')
const { randomUUID } = require("crypto");

exports.CreatePlayer = async (req,res) => {
    try {
        const {seriesId, squadId} = req.query
        if(!seriesId || !squadId){
            res.status(500).json({
                message : 'CreatePlayerController seriesId or squadId is empty.'
            })
            return;
        }

        if(squadId == 0){
            //console.log('hi')
            var responseData = await GetSeriesIdTeamAndSquadId(seriesId);
            console.log(responseData)
            var response = await CreatePlayerHelperWithoutSquadId(seriesId, responseData) 


        }else {
            console.log('hi2')
            var response = await PlayerHelper(seriesId, squadId);
        }
//console.log('test')
        var count = 0
        var responseArray = response.map((element) => {
            count++;
            let obj = {}
            obj.documentCode = randomUUID().toString('hex')
            obj.id = element.id,
            obj.playerId = element.playerId,
            obj.playerName = element.name,
            obj.playerRole = element.role,
            obj.playerBattingStyle = element.battingStyle,
            obj.playerBowlingStyle = element.bowlingStyle,
            obj.playerRoleType = element.roleType,
            obj.isWicketKeeper = element.isWicketKeeper,
            obj.isAllRounder = element.isAllRounder,
            obj.isBatsman = element.isBatsman,
            obj.isBowler = element.isBowler

            return obj;
        })

        var out = await PlayerModel.insertMany(responseArray);

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