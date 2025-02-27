const express = require("express");
const CDSSchema = require("../models/cdsModel.js");
const CDSServiceAPI = require("../configs/cdsConfig.js");
const AddLogs = require("../configs/logsConfig.js");


exports.CreateCDS = async (req,res, next) =>{
    try {
        await AddLogs('Create CDS Started!', req)
        const test = await CDSServiceAPI(cdsName = 'test-cds1');
        await AddLogs(`Create CDS test! ${JSON.stringify(test)}`, req)
        const cds = await CDSSchema.create(req.body);
        await AddLogs(`Create CDS done! ${JSON.stringify(cds)}`, req)
        res.status(200).json({
            message: "CreateCDS successful.",
            isSuccess: true,
            cds,test
          });
    } catch (error) {
        res.status(500).json({
            message: "CreateCDS Failed.",
            error,
          });
    }
}