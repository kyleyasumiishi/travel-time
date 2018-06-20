const config = require('./config');
const googleMapsClient = require('@google/maps').createClient({
    key: config.API_KEY,
});

const args = {
    origin: '47.5717777,-122.3197344',
    destination: 'Starbucks Reserve Roastery, 1124 Pike St, Seattle, WA 98101',
    mode: 'driving',
    units: 'imperial',
    language: 'en',
    departure_time: 'now'
};

function getDistanceArgs(origin, destination) {
    const distanceMatrixArgs = {
        origins: [origin],
        destinations: [destination],
        mode: 'driving',
        units: 'imperial',
        language: 'en',
        departure_time: 'now'
    }
    return distanceMatrixArgs;
}

function getDirectionArgs(origin, destination) {
    const directionArgs = {
        origin: origin,
        destination: destination,
        mode: 'driving',
        units: 'imperial',
        language: 'en',
        departure_time: 'now'
    }
    return directionArgs;
}


function getTravelInfo(args1, args2, callback) {
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

getTravelInfo(distanceMatrixArgs, directionsArgs, function(err, route, distance, duration_in_traffic) {
    if (err) return console.log(err);
    const travelInfo = {
        route: route,
        distance: distance,
        duration_in_traffic: duration_in_traffic
    };
    console.log(travelInfo);
});