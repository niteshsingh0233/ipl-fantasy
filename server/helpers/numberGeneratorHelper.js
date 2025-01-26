const axios = require("axios");

exports.numberGeneratorHelper = async (type) => {
    if(type === 1){ // team number generator
        const teamArray = ["CSK", "KKR", "MI", "SRH", "LSG", "RR", "RCB", "DC", "PBKS", "GT"];
        const ramdomText = Math.floor(( Math.random()* 10) + 1 );
        const ArrayTest = ["CSK", "KKR", "MI", "SRH", "LSG", "RR", "RCB", "DC"]
        if(!ArrayTest.includes(teamArray[ramdomText])){
            return teamArray[ramdomText].toString()
        }
        await this.numberGeneratorHelper(type);

    }if(type === 2){ // filter generator

    }if(type === 3){ // batsman generator

    }

}