const distance = require('google-distance');
const config = require('./config');
const API_KEY = config.API_KEY;

distance.apiKey = API_KEY;

distance.get(
    {
        origin: '47.5637154,-122.6533345',
        destination: '47.4686595,-122.624475',
        mode: 'driving',
        units: 'imperial'
    },
    function(err, data) {
        if (err) return console.log(err);
        const record = {
            time: new Date().toString(),
            origin: data.origin,
            destination: data.destination,
            duration_in_traffic: data.duration_in_traffic,
            distance: data.distance
        };
        console.log(record);
});


