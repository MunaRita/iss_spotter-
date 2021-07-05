const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    
    console.log(body);
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else if (body.length > 0) {

      const ip = JSON.parse(body).ip;
      callback(null, ip);
      
    }

  });

};


const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else if (body.length > 0) {

      const { latitude, longitude } = JSON.parse(body);

      callback(null, { latitude, longitude });
    }
   
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;

    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else if (body.length > 0) {
      const passes = JSON.parse(body).response;
      callback(null, passes);
    }
   
  });

};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;

    }

    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        callback(error, null);
        return;

      }

      fetchISSFlyOverTimes(location, (error, nextPasses) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = {  nextISSTimesForMyLocation };