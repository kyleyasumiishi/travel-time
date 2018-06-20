const config = require('./config');
const googleMapsClient = require('@google/maps').createClient({
    key: config.API_KEY,
});

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

module.exports = {
    googleMapsClient: googleMapsClient,
    getDirectionArgs: getDirectionArgs,
    getDistanceArgs: getDistanceArgs,
    getTravelInfo: getTravelInfo

}