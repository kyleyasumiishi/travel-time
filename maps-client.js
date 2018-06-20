const config = require('./config');
const googleMapsClient = require('@google/maps').createClient({
    key: config.API_KEY,
    Promise: Promise
});

const args = {
    origin: '47.5717777,-122.3197344',
    destination: 'Starbucks Reserve Roastery, 1124 Pike St, Seattle, WA 98101',
    mode: 'driving',
    units: 'imperial',
    language: 'en',
    departure_time: 'now'
};

const distanceMatrixArgs = {
    origins: [args.origin],
    destinations: [args.destination],
    mode: args.mode,
    units: args.units,
    language: args.language,
    departure_time: args.departure_time,
};

const directionsArgs = {
    origin: args.origin,
    destination: args.destination,
    mode: args.mode,
    units: args.units,
    language: args.language,
    departure_time: args.departure_time,
};

// const travelInfo = {};

// googleMapsClient.directions(directionsArgs).asPromise()
//     .then((data) => {
//         const route = data.json.routes[0].summary;
//         console.log(route);
//         travelInfo.route = route;
//     })
//     .catch((err) => {
//         console.log(err);
//     });
    
// googleMapsClient.distanceMatrix(distanceMatrixArgs).asPromise()
//     .then((data) => {
//         const distance = data.json.rows[0].elements[0].distance.text;
//         const duration_in_traffic = data.json.rows[0].elements[0].duration_in_traffic.text;
//         console.log(distance);
//         console.log(duration_in_traffic);
//         travelInfo.distance = distance;
//         travelInfo.duration_in_traffic = duration_in_traffic;
//     })
//     .catch((err) => {
//         console.log(err);
//     });
    



// const travelInfo = {};

// getRoute(directionsArgs, function(route) {
//     travelInfo.route = route;
// });

// getDistAndDuration(distanceMatrixArgs, function(arr) {
//     travelInfo.distance = arr[0];
//     travelInfo.duration_in_traffic = arr[1];
// });

// console.log(travelInfo);

// function getRoute(args, callback) {
//     googleMapsClient.directions(args, function(err, data) {
//         if (err) return console.log(err);
//         const route = data.json.routes[0].summary;
//         callback(route);
//     });
// }

// function getDistAndDuration(args, callback) {
//     googleMapsClient.distanceMatrix(args, function(err, data) {
//         if (err) return console.log(err);
//         const distance = data.json.rows[0].elements[0].distance.text;
//         const duration_in_traffic = data.json.rows[0].elements[0].duration_in_traffic.text;
//         callback(null, distance, duration_in_traffic);
//     });
// }

function getDistAndDuration(args1, args2, callback) {
    googleMapsClient.distanceMatrix(args1, function(err, data) {
        if (err) return console.log(err);
        const distance = data.json.rows[0].elements[0].distance.text;
        const duration_in_traffic = data.json.rows[0].elements[0].duration_in_traffic.text;
        googleMapsClient.directions(args2, function(err, data) {
            if (err) return console.log(err);
            const route = data.json.routes[0].summary;
            callback(null, route, distance, duration_in_traffic);
        });
    });
}

getDistAndDuration(distanceMatrixArgs, directionsArgs, function(err, route, distance, duration_in_traffic) {
    if (err) return console.log(err);
    const travelInfo = {
        route: route,
        distance: distance,
        duration_in_traffic: duration_in_traffic
    };
    console.log(travelInfo);
    // console.log(route);
    // console.log(distance);
    // console.log(duration_in_traffic);
});