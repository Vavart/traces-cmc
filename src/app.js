// Define your data
// const scores = [
//   { tdelille: 1 },
//   { ddaniaupotter: 0.52404736722598 },
//   { sebastien: 0.0015430399383962535 },
//   { gachort: 0.82373870846468 },
//   { madeth: 0 },
//   { admin: 0.021538437512076316 },
//   { mmay: 0.2396514588456161 },
//   { cdejean: 0.08150467480980861 },
//   { fdarriet: 0.3396860308128035 },
//   { mwollenburger: 0.6746883852052974 },
//   { tsoubrie: 0.0904335165287936 },
//   { insauser1: 0.00012506796817659136 },
//   { mgodwod: 0.11588723430755449 },
//   { jvasseur: 0.19261322062767935 },
//   { mdanet: 0.2458137935571908 },
//   { psalam: 0.03980490135359243 },
//   { guest: 0.0017972707749283592 },
//   { cevanen: 0.07033994591338322 },
//   { cfroger: 0.03826789917097567 },
//   { adebeuckelaere: 0.03585509345245963 },
//   { shernu: 0.03593962884937366 },
//   { xjmechain: 0.012409812761064117 },
//   { ntricoit: 0.0014512343585374372 }
// ];

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});