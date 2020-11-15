const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=fc05b4ff2f661e10d08982edb5341b3d&query=' + latitude + ', ' + longitude

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    }
    else if (body.error) {
      callback('Unable to connect!', undefined)
    }
    else {
      callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
    }
  })
}

module.exports = forecast