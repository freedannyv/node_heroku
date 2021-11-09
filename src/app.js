const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Defines path for Express config
// points to our public directory, where css, js and imgs are served up from
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// must setup the view engine to be hbs, when using dynamic templates. 
app.set('view engine', 'hbs')

// redirect the views path to the directory that we put the views
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// tells express the folder to look for the public files
app.use(express.static(publicDirectoryPath))



// res.render, renders the dynamic views using handlebars
app.get('/', (req, res) => {
  res.render('index', {title: 'This is a title', name: 'Daniel Venn'})
})

app.get('/about', (req, res) => {
  res.render('about', {title: 'About Page', name: 'Daniel Venn'})
})

app.get('/help', (req, res) => {
  res.render('help', {title: 'Need help?', message: 'Find what you are looking for here.', name: 'Daniel Venn'})
})

// when this URL is entered, the code within the app.get() function is run. In this case, the weather app.
app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({message: 'Please enter a valid location'})
  }

  geocode(req.query.address, (error, {lat, lon, loc} = {}) => {
  if(!req.query.address) {
    return res.send({message: 'Please add an address'})
  }
  if(error) {
    return res.send({error})
  } else {
    forecast(lat,lon, (error, forecastData) => {
      if(error) {
        return res.send({error})
      } 
        res.send({
          data: forecastData.current.temperature + ' degrees in ' + forecastData.location.name + ', ' + forecastData.location.country, place: forecastData.location.name,
        country: forecastData.location.country})
      
    })

  }
})
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({message: 'Please enter a search'})
  } 
    res.send('You searched for ' + req.query.search)
  
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    message: 'This help article does not exist'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    message: '404. Page not found.'
  })
})

app.listen(3000, () => {
  console.log('Server Running')
})