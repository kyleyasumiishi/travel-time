const fs = require('fs');
const maps = require('./maps-client');
const locations = require('./locations').locations;
const getDistanceArgs = maps.getDistanceArgs;
const getDirectionArgs = maps.getDirectionArgs;
const getTravelInfo = maps.getTravelInfo;

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
        // push travelInfo to an array
        // console.log(json);
        // console.log(travelInfo);
        fs.appendFile('results.txt', json, function(err) {
            if (err) return console.log('There was an error');
            console.log('Saved')
        });
    });
}



// let distanceMatrixArgs = getDistanceArgs(locations.locations[0][0], locations.locations[0][1]);

// let directionsArgs = getDirectionArgs(locations.locations[0][0], locations.locations[0][1]);

// console.log(distanceMatrixArgs);
// console.log(directionsArgs);

// getTravelInfo(distanceMatrixArgs, directionsArgs, function(err, route, distance, duration_in_traffic) {
//     if (err) return console.log(err);
//     const travelInfo = {
//         route: route,
//         distance: distance,
//         duration_in_traffic: duration_in_traffic
//     };
//     // push travelInfo to an array
//     console.log(travelInfo);
// });