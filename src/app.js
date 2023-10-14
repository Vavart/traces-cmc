// File: app.jjs
// Author: Clara D. & Maxime S.
// Description: Display the chart into the web page

// Chart
const ctx = document.getElementById('myChart');

class UserDataset {
  constructor(label, backgroundColor) {
    this.label = label;
    this.data = [];
    this.backgroundColor = backgroundColor;
  }
}

function getChartConfig(chartData, dataset) {
  return {
    type: 'bar',
    data: {
      labels: chartData.map(indicator => indicator.date),
      datasets: dataset,
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Score'
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
            text: 'Score'
          }
        }
      }
    },
  }
} 


function getUsers(data) {
  const users = []
  data.forEach(user => {
    users.push(Object.keys(user)[0])
  }) 

  return users
}

// Get data onLoad
document.addEventListener("DOMContentLoaded", () => {
  fetch("/data/indicators.json")
  .then (response => response.json())
  .then (data => {
    console.log(data);

    // console.log(data.map(indicator => indicator.date));
    const dataScores = data.map(indicator => indicator.data);

    // const nbUsers = dataScores.map(score => score.length)[0]; // 23 users

    const users = getUsers(data[0].data)
    const usersDatasets = []

    const usersColors = ["#FF5733",
    "#44A2B9",
    "#E59400",
    "#008C45",
    "#7D3C98",
    "#0094E0",
    "#FF6F61",
    "#2E3192",
    "#FFAA00",
    "#00A885",
    "#A020F0",
    "#00A9A5",
    "#F472D0",
    "#00B0F0",
    "#FFC400",
    "#60A917",
    "#FFAC2E",
    "#218380",
    "#FF58B6",
    "#0353A4",
    "#FF4255",
    "#00A699",
    "#AB83A1"]

    for (let i = 0; i < users.length; i++) {
      usersDatasets.push(new UserDataset(users[i], usersColors[i]))
    }

    dataScores.forEach((score) => {
      score.forEach((value) => {
        const userName = Object.keys(value)[0]
        const userScore = Object.values(value)[0] == null ? 0 : Object.values(value)[0]
        const userIndex = usersDatasets.findIndex(dataset => dataset.label === userName);
        usersDatasets[userIndex].data.push(userScore)
      });
    });

    // console.log(usersDatasets);

    config = getChartConfig(data, usersDatasets);
    new Chart(ctx, config);
  })
});

// const btn = document.getElementById("btn");
// btn.addEventListener("click", getSomething);