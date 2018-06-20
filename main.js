const fs = require('fs');
const maps = require('./maps-client');
const config = require('./config');
const locations = config.locations;
const getDistanceArgs = maps.getDistanceArgs;
const getDirectionArgs = maps.getDirectionArgs;
const getTravelInfo = maps.getTravelInfo;

const interval = 5 * 60 * 1000;

getTravelTimes();
setInterval(() => {getTravelTimes()}, interval);

function getTravelTimes() {
    for (let i = 0; i < locations.length; i++) {
        const origin = locations[i][0];
        const destination = locations[i][1];
        const distanceMatrixArgs = getDistanceArgs(origin, destination);
        const directionsArgs = getDirectionArgs(origin, destination);
        
        getTravelInfo(distanceMatrixArgs, directionsArgs, function(err, route, distance, duration_in_traffic) {
            if (err) return console.log(err);
            const travelInfo = {
                time: new Date().toString(),
                route: route,
                distance: distance,
                duration_in_traffic: duration_in_traffic
            };
            const json = JSON.stringify(travelInfo) + '\n';
            fs.appendFile('results.txt', json, function(err) {
                if (err) return console.log('There was an error saving to results file');
                console.log(`Saved updated results for route ${travelInfo.route}`);
            });
        });
    }
}




