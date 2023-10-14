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
    let currDate = minDate;

    // Create the list of users and their actions
    const usersList = evalFuncs.createUsersList(data);

    let i = 0;
    let dateIn7Days = currDate;
    
    while (currDate <= maxDate) {

        console.log("Reading : " + currDate);
        indicatorsData.push(new Indicator(new Date(currDate), []));
        
        // Get the data for the current date
        // const currData = evalFuncs.getDataForDate(data, usersList, currDate);
        dateIn7Days.setDate(currDate.getDate() + 6);
        const currData = evalFuncs.getDataIntoDates(data, usersList, currDate, dateIn7Days);

        const usersActions = evalFuncs.createUsersActions(usersList);

        // Compute score for currData
        const usersMeasures = evalFuncs.countActions(currData, usersActions);
        const measures = evalFuncs.getMinAndMaxOfAllData(usersMeasures);
        const usersScores = evalFuncs.evaluateScore(usersMeasures, measures);
        const usersTotalScores = evalFuncs.evaluateTotalScore(usersScores);
        const [scoreMin, scoreMax] = evalFuncs.getMinAndMaxScoreOfUser(usersTotalScores);
        const usersNormalizedScores = evalFuncs.normalizeScore(usersTotalScores, scoreMin, scoreMax);
        const scores = evalFuncs.getAllScores(usersNormalizedScores);

        indicatorsData[i].data = scores;
        i++;
        currDate.setDate(dateIn7Days.getDate() + 1);

    }

    const jsonFile = JSON.stringify(indicatorsData);
    createJsonFile(jsonFile, INDICATORSPATH);
}

const data = readJSONFile(DATAPATH);
generateIndicators(data);