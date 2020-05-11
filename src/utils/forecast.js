const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1faba77a2a4bf8abdfeca8e98c4e2483&query=' + latitude + ',' + longitude + '&units=m';

    request({url, json:true}, (error, { body } = {}) => {        
        if(error){
            callback('Unable to connect to the weather service', undefined);
        }
        else if(body.error){
            callback('Unable to find location', undefined);
        }        
        else{
            const data = body.current;            
            const completeData = `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out but it feels like ${data.feelslike} degrees out.\n Humidity is at ${data.humidity} with a ` + (parseFloat(data.precip) * 100) + '% chance of percipitation and rainfall';
            callback(undefined, completeData);    
          
        }
    })
}

module.exports = forecast;