console.log('Client side JS file is loaded')

const country = document.getElementById('country')
const forecast = document.getElementById('forecast')
const input = document.querySelector('.input')
const form = document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault()

  fetch(`http://localhost:3000/weather?address=${input.value}`).then((res) => {
    res.json().then((data) => {
      if(data.error) {
        console.log(data.error)
      } else {
        input.value = ''

        country.textContent = ''
        forecast.textContent = ''

        country.textContent = data.country
        forecast.textContent = data.data
      }
    })
  }
)
})


// a simple request to call the weather data using the backend server we set up (geocode and forecast)
