/*

Construire la liste des indicateurs à partir des fonctions evaluation.mjs
1. Créer un fichier .json par jour (genre { date : [score1, score2, score3, ...] etc... }) pour chartjs
2. Créer des fonctions pour prendre les mois 
3. Créer un bouton (action) par mois ? Est-ce que ça fera trop ?
4. Voir pour peut-être le faire autrement ? (pas de bouton, mais un menu déroulant ? pour les années au moins ?)

*/

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
    const currDate = minDate;

    // Create the list of users and their actions
    const usersList = evalFuncs.createUsersList(data);

    let i = 0;
    
    while (currDate <= maxDate) {

        indicatorsData.push(new Indicator(currDate, []));
        
        // Get the data for the current date
        const currData = evalFuncs.getDataForDate(data, usersList, currDate);
        const usersActions = evalFuncs.createUsersActions(usersList);

        // Compute score for currData
        const usersMeasures = evalFuncs.countActions(currData, usersActions);
        const measures = evalFuncs.getMinAndMaxOfAllData(usersMeasures);
        const usersScores = evalFuncs.evaluateScore(usersMeasures, measures);
        const usersTotalScores = evalFuncs.evaluateTotalScore(usersScores);
        const [scoreMin, scoreMax] = evalFuncs.getMinAndMaxScoreOfUser(usersTotalScores);
        const usersNormalizedScores = evalFuncs.normalizeScore(usersTotalScores, scoreMin, scoreMax);
        const scores = evalFuncs.getAllScores(usersNormalizedScores);

        indicatorsData[i++].data = scores;
        currDate.setDate(currDate.getDate() + 1);
    }

    const jsonFile = JSON.stringify(indicatorsData);
    createJsonFile(jsonFile, INDICATORSPATH);
}

const data = readJSONFile(DATAPATH);
// generateIndicators(data);