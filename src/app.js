// File: app.jjs
// Author: Clara D. & Maxime S.
// Description: Display the chart into the web page

// Utils
const DATAPATH = "/data/indicators.json";
const usersColors = ["#FF5733", "#44A2B9", "#E59400", "#008C45", "#7D3C98", "#0094E0", "#FF6F61", "#2E3192", "#FFAA00", "#00A885", "#A020F0", "#00A9A5", "#F472D0", "#00B0F0", "#FFC400", "#60A917", "#FFAC2E", "#218380", "#FF58B6", "#0353A4", "#FF4255", "#00A699", "#AB83A1"]
let allData = [];

class UserDataset {
  constructor(label, backgroundColor) {
    this.label = label;
    this.data = [];
    this.backgroundColor = backgroundColor;
  }
}

// TODO : créer une fonction pour créer un dataset à partir d'une fréquence (de manière générale)
// à refaire
function dateSorter(data, frequency="day") {

  // const newData = [];

  // data.forEach(day => {
  //   const newDay = {
  //     date: day.date,
  //     data: []
  //   }

  //   day.data.forEach(user => {
  //     const newUser = {}
  //     newUser[Object.keys(user)[0]] = Object.values(user)[0] == null ? -0.0001 : Object.values(user)[0]
  //     newDay.data.push(newUser)
  //   })

  //   newData.push(newDay)
  // })

  // return newData;
}

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
    // console.log(data);

    // Creating the datasets for the chart (one dataset per user, with the user's name as label and a random color)
    const dataScores = data.map(indicator => indicator.data);
    const users = getUsers(data[0].data)
    const usersDatasets = []

    for (let i = 0; i < users.length; i++) {
      usersDatasets.push(new UserDataset(users[i], usersColors[i]))
    }

    dataScores.forEach((score) => {
      score.forEach((value) => {
        const userName = Object.keys(value)[0]
        const userScore = Object.values(value)[0] == null ? -0.0001 : Object.values(value)[0]
        const userIndex = usersDatasets.findIndex(dataset => dataset.label === userName);
        usersDatasets[userIndex].data.push(userScore)
      });
    });

    // Update the chart config
    config.data.labels = data.map(indicator => new Date(indicator.date).getDate() + "/" + (new Date(indicator.date).getMonth() + 1) + "/" + new Date(indicator.date).getFullYear()),
    config.data.datasets = usersDatasets;
    myChart.update();

  })
});


// Add actions to the chart (buttons)
const actions = [
  {
    name: 'Nullify',
    handler(chart) {
      chart.data.datasets = [],
      chart.update();
    }
  },
];

actions.forEach(action => {
  const button = document.createElement('button');
  button.classList.add('chart-action');
  button.innerText = action.name;
  button.addEventListener('click', () => action.handler(myChart));
  document.querySelector('.chart-actions').appendChild(button);
})

// Create the chart
const ctx = document.getElementById('myChart');
let myChart = new Chart(ctx, config);