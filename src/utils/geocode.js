const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZnJlZWRhbm55diIsImEiOiJja3UycXBxbWE0OXg3MnFwbTBsd2FvOGVjIn0.XqHB_-GAxWQEoAqt9jBkSA`

  request({url, json: true}, (error, { body }) => {
    if(error) {
      callback('Unable to connect to location services', undefined)
    } else if( body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined)
    } else {
      callback(undefined, {
         lat: body.features[0].center[1],
         lon: body.features[0].center[0],
         loc: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode