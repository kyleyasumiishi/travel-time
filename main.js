const distance = require('./google-distance');
const config = require('./config');
const API_KEY = config.API_KEY;
const milliseconds = 1 * 60 * 1000;

// put summary path in object

const args = {
    origin: '47.4687851,-122.6241453',
    destination: '47.5637248,-122.6531826',
    mode: 'driving',
    units: 'imperial'
};

function callback(err, data) {
    if (err) return console.log(err);
        const record = {
            time: new Date().toString(),
            origin: data.origin,
            destination: data.destination,
            duration_in_traffic: data.duration_in_traffic,
            distance: data.distance
        };
        console.log(record);
        console.log(data);
};

distance.apiKey = API_KEY;

// setInterval(function() { distance.get(args, callback) }, milliseconds);

distance.get(args, callback);