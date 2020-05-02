const request = require('request')

const forecast = (latitude, longitude, callback) => {    
    const url = 'http://api.weatherstack.com/forecast?access_key=b875300e6423be8c1562cef4d7fc0eef&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, response, body) => {  
        if(error) {
            callback('Unable to access the weather api.', undefined)
        }
        else if (response.body.error)
            callback('Please specify a valid location identifier using the query parameter.', undefined)
        else {        
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is presently '+ response.body.current.temperature + ' degree celcius the chances of rain is ' + response.body.current.precip + ' %')
        }
    })
}

module.exports = forecast