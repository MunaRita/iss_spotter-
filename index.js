//const { fetchMyIP } = require('./iss');
//const { fetchCoordsByIP} = require('./iss');
//const { fetchISSFlyOverTimes} = require('./iss');

const { nextISSTimesForMyLocation} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP('142.120.72.40', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned Coordinates:' , coordinates);
// });


// fetchISSFlyOverTimes({ latitude: '45.3867', longitude: '-75.7381' }, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned Flyover Times:' , passTimes);
// });


const PassTimesDisplay = function(passTimes) {
  for (const pass of passTimes) {
    const dateOfTimeOfPass = new Date(0);
    dateOfTimeOfPass.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateOfTimeOfPass} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  PassTimesDisplay(passTimes);
});
