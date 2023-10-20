// File: app.js
// Author: Clara D. & Maxime S.
// Description: Display the chart into the web page

// Utils
const DATAPATH = "../data/indicators.json";
const usersColors = ["#FF5733", "#44A2B9", "#E59400", "#008C45", "#7D3C98", "#0094E0", "#FF6F61", "#2E3192", "#FFAA00", "#00A885", "#A020F0", "#00A9A5", "#F472D0", "#00B0F0", "#FFC400", "#60A917", "#FFAC2E", "#218380", "#FF58B6", "#0353A4", "#FF4255", "#00A699", "#AB83A1"]
const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};
let allData = [];

class UserDataset {
  constructor(label, backgroundColor) {
    this.label = label;
    this.data = [];
    this.backgroundColor = backgroundColor;
  }
}

// Creating the datasets for the chart (one dataset per user, with the user's name as label and a random color)
function getUserDatasets(data) {

  const dataScores = data.map(indicator => indicator.data);
  const users = getUsers(data[0].data)
  const usersDatasets = []

  for (let i = 0; i < users.length; i++) {
    usersDatasets.push(new UserDataset(users[i], usersColors[i]))
  }


  dataScores.forEach((score) => {
    score.forEach((value) => {
      const userName = Object.keys(value)[0]
      // const userScore = Object.values(value)[0] == null ? 0 : Object.values(value)[0]
      const userScore = Object.values(value)[0]
      const userIndex = usersDatasets.findIndex(dataset => dataset.label === userName);
      usersDatasets[userIndex].data.push(userScore)
    });
  });

  return usersDatasets;

}

function getUserLabels(data) {
  return data.map(indicator => new Date(indicator.date).getDate() + "/" + (new Date(indicator.date).getMonth() + 1) + "/" + new Date(indicator.date).getFullYear());
}

function separateDataByMonthsAndYear(data, month, year) {
  const newData = [];

  data.forEach(day => {
    const dayDate = new Date(day.date);
    if (dayDate.getMonth() + 1 === month && dayDate.getFullYear() === year) {
      newData.push(day);
    }
  });

  return newData;
}

function isDataNull(data) {
  let isNull = true;
  data.forEach(user => {
    user.data.forEach(score => {
      if (Object.values(score)[0] != null) {
        isNull = false;
      }
    })
  });

  return isNull;
}

function getMinAndMaxDate(data) {
  const dates = data.map(day => new Date(day.date));
  const minDate = new Date(Math.min.apply(null, dates));
  const maxDate = new Date(Math.max.apply(null, dates));

  return [minDate, maxDate];
}


// Get the user names of the data
function getUsers(data) {
  const users = []
  data.forEach(user => {
    users.push(Object.keys(user)[0])
  }) 

  return users
}

// Get data onLoad
document.addEventListener("DOMContentLoaded", () => {
  fetch(DATAPATH)
  .then (response => response.json())
  .then (data => {

    allData = data; 

    // Update the chart config
    config.data.labels = getUserLabels(data)
    config.data.datasets = getUserDatasets(data);
    createChartActions();
    myChart.update();

  })
});

// Chart config
let config = {
  type: 'bar',
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    responsive: true,
  plugins: {  
      title: {
        display: true,
        text: 'Utilisateurs'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        stacked: true,
        display: true,
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        stacked: true,
        display: true,
        title: {
          display: true,
          text: 'Score cummulé'
        }
      }
    }
  },
}

function createChartActions() {
  // Add actions to the chart (buttons)
  const actions = [];
  const years = [2009, 2010];

  const [minDate, maxDate] = getMinAndMaxDate(allData);

  for (const year of years) {
    for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {

      if (new Date(year, monthNumber , 1) <= minDate || new Date(year, monthNumber - 1, 1) >= maxDate) {
        continue;
      }

      const newData = separateDataByMonthsAndYear(allData, monthNumber, year);
      actions.push({
        name: `${months[monthNumber]} ${year}`,
        isDataNull: isDataNull(newData),
        handler(chart) {
          const newData = separateDataByMonthsAndYear(allData, monthNumber, year);
          chart.data.labels = getUserLabels(newData)
          chart.data.datasets = getUserDatasets(newData);
          chart.update();
        }
      });
    }
  }

  actions.push({
    name: "All",
    handler(chart) {
      chart.data.datasets = getUserDatasets(allData);
      chart.data.labels = getUserLabels(allData)
      chart.update();
    }
  });

  actions.forEach(action => {
    const button = document.createElement('button');
    button.classList.add('chart-action');
    button.innerText = action.name;
    button.addEventListener('click', () => {
      removeHoverClass();
      button.classList.add('active');
      action.handler(myChart)
    });
    document.querySelector('.chart-actions').appendChild(button);
  })
}


function removeHoverClass() {
  const buttons = document.querySelectorAll('.chart-action');
  buttons.forEach(button => {
    button.classList.remove('active');
  })
}


// Create the chart
const ctx = document.getElementById('myChart');
let myChart = new Chart(ctx, config);