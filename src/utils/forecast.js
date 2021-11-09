const request = require('request')

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0f0b60eda9446c44b3bfa7e0c1065a06&query=${lat},${lon}`
  
  request({ url, json: true }, (err, res) => {
    if(err) {
      callback('This is an error from forecast', undefined)
    }
   else {
      callback(undefined, res.body )
    }
    
  })

}

module.exports = forecast