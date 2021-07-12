const { nextISSTimesForMyLocation } = require('./iss_promised');

  const PassTimesDisplay = function(passTimes) {
    for (const pass of passTimes) {
      const dateOfTimeOfPass = new Date(0);
      dateOfTimeOfPass.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${dateOfTimeOfPass} for ${duration} seconds!`);
    }
  };
  
  
  nextISSTimesForMyLocation() 
  .then((passTimes) => {
    passTimesDisplay(passTimes);

  })

  .catch((error) => {
    console.log("It didn't work:", error.message);
  });