const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2FjaGluc2F4ZW5hMTk5NiIsImEiOiJjazlpZ2c2dGgxOTVoM2xxYnR3c2JlcTRjIn0.f22IzTktPMrVbQi8TM5uHA'
    request({url, json: true}, (error, response) => {        
        if (error) {
            callback('Unable to access the Geocoding api.', undefined)
        }
        else if (response.body.features[0] === undefined) {
            callback('Please specify a valid location.', undefined)
        }
        else {
            callback(undefined,
                {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                })       
        }
    })
}

module.exports = geocode