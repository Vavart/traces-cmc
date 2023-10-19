// File: getIndicators.mjs
// Author: Clara D. & Maxime S.
// Description: Get the indicators from the data and write them in a JSON file

// Dependencies
import { DATAPATH, INDICATORSPATH } from './config.mjs';
import { readJSONFile, createJsonFile } from './jsonUtils.mjs';
import { Indicator } from "./classes.mjs"
import * as evalFuncs from './evaluation.mjs';


function generateIndicators(data) {

    // Prepare the JSON
    const indicatorsData = []

    // Get min and max date from the data
    const [minDate, maxDate] = evalFuncs.getMinAndMaxDate(data);
    let dateIn7Days = new Date(minDate);

    // Create the list of users and their actions
    const usersList = evalFuncs.createUsersList(data);

    let i = 0;

    for (let currDate = new Date(minDate); currDate <= maxDate; currDate.setDate(currDate.getDate() + 7)) {

        console.log("Reading : " + currDate);
        indicatorsData.push(new Indicator(new Date(currDate), []));
        
        // Get the data for the current date
        dateIn7Days = new Date(currDate);
        dateIn7Days.setDate(dateIn7Days.getDate() + 7);
        const currData = evalFuncs.getDataIntoDates(data, usersList, currDate, dateIn7Days);
        
        // Compute score for currData
        const usersActions = evalFuncs.createUsersActions(usersList);
        const usersMeasures = evalFuncs.countActions(currData, usersActions);
        const measures = evalFuncs.getMinAndMaxOfAllData(usersMeasures);
        const usersScores = evalFuncs.evaluateScore(usersMeasures, measures);
        const usersTotalScores = evalFuncs.evaluateTotalScore(usersScores);
        const [scoreMin, scoreMax] = evalFuncs.getMinAndMaxScoreOfUser(usersTotalScores);
        const usersNormalizedScores = evalFuncs.normalizeScore(usersTotalScores, scoreMin, scoreMax);
        const scores = evalFuncs.getAllScores(usersNormalizedScores);

        indicatorsData[i].data = scores;
        i++;

    }
    
    // Write the JSON file
    const jsonFile = JSON.stringify(indicatorsData);
    createJsonFile(jsonFile, INDICATORSPATH);
}

const data = readJSONFile(DATAPATH);
generateIndicators(data);