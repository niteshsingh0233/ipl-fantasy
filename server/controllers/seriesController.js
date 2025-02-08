const express = require("express");
const {URLConstants, SERIESLIST, SERIESLISTARCHIVES} = require('../constants/urlConstants.js')
const {cricbuzzAPIHelper} = require('../helpers/crircbuzzAPIHelper.js')

exports.GetSeriesListController = async (req, res) => {
    try {
        const URL = URLConstants[SERIESLIST[req.params.id]]
        let response = await cricbuzzAPIHelper(URL);
        res.status(200).json({
            message: "",
            response: response,
          });


    } catch (error) {
        res.status(500).json({
            message: "",
            error: error,
          });
    }
}

exports.GetSeriesArchiveListController = async (req, res) => {
    try {
        const {year, lastId} = req.query
        console.log(year, lastId, req.params.id)
        let URL = URLConstants[SERIESLISTARCHIVES[req.params.id]]
        if(year && lastId){
            console.log(URL)
            URL = `${URL}?year=${year}&lastId=${lastId}`
            console.log(URL)
        }

        let response = await cricbuzzAPIHelper(URL);
        res.status(200).json({
            message: "",
            response: response,
          });
          


    } catch (error) {
        res.status(500).json({
            message: "",
            error: error,
          });
    }
}

exports.GetSeriesMatches = async (req,res) =>{
    try {
        const seriesId = req.params.id
        let URL = URLConstants['SERIES_LIST_MATCHES_LIST']
        if(seriesId){
            URL = `${URL}/${seriesId}`
        }

        let response = await cricbuzzAPIHelper(URL);
        res.status(200).json({
            message: "",
            response: response,
          });
          


    } catch (error) {
        res.status(500).json({
            message: "",
            error: error,
          });
    }
}

exports.GetSeriesSquad = async (req,res)=>{
    try {
        const seriesId = req.params.id
        let URL = URLConstants['SERIES_SQUAD_LIST']
        if(seriesId){
            URL = `${URL}/${seriesId}/squads`
        }

        let response = await cricbuzzAPIHelper(URL);
        res.status(200).json({
            message: "",
            response: response,
          });
          


    } catch (error) {
        res.status(500).json({
            message: "",
            error: error,
          });
    }
}

exports.GetSeriesSquadPlayers = async (req,res) => {
    try {
        const seriesId = req.params.seriesId
        const squadId = req.params.squadId
        let URL = URLConstants['SERIES_SQUAD_PLAYERS_LIST']
        if(seriesId && squadId){
            URL = `${URL}/${seriesId}/squads/${squadId}`
        }

        let response = await cricbuzzAPIHelper(URL);
        res.status(200).json({
            message: "",
            response: response,
          });
          


    } catch (error) {
        res.status(500).json({
            message: "",
            error: error,
          });
    }
}

exports.GetSeriesVenueList = async (req,res) => {
    try {
        const seriesId = req.params.seriesId
        console.log(seriesId)
        let URL = URLConstants['SERIES_VENUES_LIST']
        if(seriesId){
            URL = `${URL}/${seriesId}/venues`
        }

        let response = await cricbuzzAPIHelper(URL);
        res.status(200).json({
            message: "",
            response: response,
          });
          


    } catch (error) {
        res.status(500).json({
            message: "",
            error: error,
          });
    }
}

exports.GetSeriesStatFilters = async (req,res) => {
    try {
        const seriesId = req.params.seriesId
        let URL = URLConstants['SERIES_STAT_FILTERS_LIST']
        if(seriesId){
            URL = `${URL}/${seriesId}`
        }

        let response = await cricbuzzAPIHelper(URL);
        res.status(200).json({
            message: "",
            response: response,
          });
          


    } catch (error) {
        res.status(500).json({
            message: "",
            error: error,
          });
    }
}

exports.GetSeriesStatDetails = async (req,res) => {
    try {
        const seriesId = req.params.seriesId
        let URL = URLConstants['SERIES_GET_STAT_DETAILS']
        if(seriesId){
            //URL = `${URL}/${seriesId}`
        }

        let response = await cricbuzzAPIHelper(URL);
        res.status(200).json({
            message: "",
            response: response,
          });
          


    } catch (error) {
        res.status(500).json({
            message: "",
            error: error,
          });
    }
}