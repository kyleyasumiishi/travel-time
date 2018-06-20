const distance = require('google-distance');
const config = require('./config');
const API_KEY = config.API_KEY;
const milliseconds = 1 * 60 * 1000;

// put summary path in object

const args = {
    origin: 'University High School, 1108 Texas Ave, Los Angeles, CA 90025',
    destination: 'KPMG, 550 S Hope St, Los Angeles, CA 90071',
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
        // console.log(data);
};

distance.apiKey = API_KEY;

// setInterval(function() { distance.get(args, callback) }, milliseconds);

distance.get(args, callback);