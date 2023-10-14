// File: evaluation.mjs
// Author: Clara D. & Maxime S.
// Description: This file is used  to evaluate the data from the JSON file and determine the score of each user

// Dependencies
import { User, Connection, Display, Posts, Activity, UserStats, Measures } from './classes.mjs';
import { WEIGHTS, CATEGORIES } from './config.mjs';

// Filter the data according to a start date and an end date
function getDataIntoDates(data, usersList, dateStart, dateEnd) {
  let filteredData = [];
  data.forEach(row => {

    filteredData.push(new User(row.name));
    // console.log(row.name);
    
    row.connections.forEach(connection => {
      const parsedDate = new Date(connection.date);
      if (parsedDate >= dateStart && parsedDate <= dateEnd) {
        filteredData[usersList.indexOf(row.name)].connections.push(connection);
      }
    });
  
    row.displays.forEach(display => {
      const parsedDate = new Date(display.date);
      if (parsedDate >= dateStart && parsedDate <= dateEnd) {
        filteredData[usersList.indexOf(row.name)].displays.push(display);
      }
      });
      
      row.posts.forEach(post => {
          const parsedDate = new Date(post.date);
          if (parsedDate >= dateStart && parsedDate <= dateEnd) {
              filteredData[usersList.indexOf(row.name)].posts.push(post);
            }
          });
          
      row.activities.forEach(activity => { 
        const parsedDate = new Date(activity.date);
        if (parsedDate >= dateStart && parsedDate <= dateEnd) {
            filteredData[usersList.indexOf(row.name)].activities.push(activity);
        }
      });     
  })

  return filteredData;
}

function getDataForDate(data,usersList, date) {
  return getDataIntoDates(data, usersList, date, date);
}


function getMinAndMaxDate(data) {

  let min, max;

  try {

    let i = 0;
    let catIndex = 0;
    while (data[i][CATEGORIES[catIndex]].length === 0) {
      i++;
  
      if (i === data.length) {
        catIndex++;
        i = 0;
        
      }
    }

    min = new Date(data[i][CATEGORIES[catIndex]][0].date);
    max = new Date(data[i][CATEGORIES[catIndex]][0].date);
  }

  catch(e) {
    console.log("No data found : "  + e);
  }


  data.forEach(row => {
    row.connections.forEach(connection => {
      const parsedDate = new Date(connection.date);
      if (parsedDate < min) {
        min = parsedDate;
      }
      if (parsedDate > max) {
        max = parsedDate;
      }
    });
    row.displays.forEach(connection => {
      const parsedDate = new Date(connection.date);
      if (parsedDate < min) {
        min = parsedDate;
      }
      if (parsedDate > max) {
        max = parsedDate;
      }
    });
    row.posts.forEach(connection => {
      const parsedDate = new Date(connection.date);
      if (parsedDate < min) {
        min = parsedDate;
      }
      if (parsedDate > max) {
        max = parsedDate;
      }
    });
    row.activities.forEach(connection => {
      const parsedDate = new Date(connection.date);
      if (parsedDate < min) {
        min = parsedDate;
      }
      if (parsedDate > max) {
        max = parsedDate;
      }
    });
  });

  return [min, max];
}
  
function createUsersList(data) {
  return data.map(row => row.name);
}

// Create an array of users with their name and their actions (connections, displays, posts, activities)
function createUsersActions(usersList) {
  let usersActions = [];
  usersList.forEach(name => {
    usersActions.push(new UserStats(name));
  });

  return usersActions;
}
 
// Count the number of actions for each user
function countActions(data, usersActions) {
    data.forEach(row => {
      usersActions.forEach(user => {
        if (row.name === user.name) {
          user.connections += row.connections.length;
          user.displays += row.displays.length;
          user.posts += row.posts.length;
          user.activities += row.activities.length;
        }
      });
    });

    return usersActions;
}

// Get the minimum and maximum of a data
function getMinAndMaxOfData(usersMeasures, title) {
  let min = usersMeasures[0][title];
  let max = usersMeasures[0][title];

  usersMeasures.forEach(row => {
    if (row[title] < min) {
      min = row[title];
    }
    if (row[title] > max) {
      max = row[title];
    }
  });

  return [min, max];
}

// Get the minimum and maximum of all the data (connections, displays, posts, activities)
function getMinAndMaxOfAllData(usersMeasures) {
  const measures = new Measures();
  CATEGORIES.forEach(title => {
    const [min, max] = getMinAndMaxOfData(usersMeasures, title);
    measures[`max${title}`] = max;
    measures[`min${title}`] = min;
  });

  return measures;
}

// Evaluate the score of each user per action (connections, displays, posts, activities)
function evaluateScore(usersMeasures, measures) {
  usersMeasures.forEach(user => {
    CATEGORIES.forEach(title => {
      user[title] === 0 ? user[`${title}Score`] = 0 : user[`${title}Score`] = (user[title] - measures[`min${title}`]) / (measures[`max${title}`] - measures[`min${title}`]);
      // user[`${title}Score`] = (user[title] - measures[`min${title}`]) / (measures[`max${title}`] - measures[`min${title}`]);
    });
  });

  return usersMeasures;
}

// Evaluate the total score of each user
function evaluateTotalScore(usersScores) {
  usersScores.forEach(user => {
    user.score = 0;
    CATEGORIES.forEach(title => {
      user.score += user[`${title}Score`] * WEIGHTS[title];
    });
  });

  return usersScores;
}

// Get the minimum and maximum score of a user
function getMinAndMaxScoreOfUser(usersTotalScores) {
  let min = usersTotalScores[0].score;
  let max = usersTotalScores[0].score;

  usersTotalScores.forEach(user => {
    if (user.score < min) {
      min = user.score;
    }
    if (user.score > max) {
      max = user.score;
    }
  });

  return [min, max];
}

// Normalize the score of each user according to the minimum and maximum score (previous function)
function normalizeScore(usersTotalScores, scoreMin, scoreMax) {
  usersTotalScores.forEach(user => {
    user.normalizedscore = (user.score - scoreMin) / (scoreMax - scoreMin);
  });

  return usersTotalScores;
}

// Get all the scores of each user (normalized score, apart from the others attributes of the user)
function getAllScores(usersNormalizedScores) {
  let scores = [];
  usersNormalizedScores.forEach(user => {
    const scoreObject =  {};
    scoreObject[user.name] = user.normalizedscore;
    scores.push(scoreObject);
    
  });

  return scores;
}

export { getDataIntoDates, getDataForDate, getMinAndMaxDate, createUsersList, createUsersActions, countActions, getMinAndMaxOfData, getMinAndMaxOfAllData, evaluateScore, evaluateTotalScore, getMinAndMaxScoreOfUser, normalizeScore, getAllScores };

