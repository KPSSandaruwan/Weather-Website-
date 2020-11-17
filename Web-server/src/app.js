const path = require('path')
const express = require('express')
const { RSA_NO_PADDING } = require('constants')
const hbs = require('hbs')
const { error } = require('console')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public')) // Return the final path

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
//Customize the view path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // Handle dynamic web pages
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Suraja Sandaruwan'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Suraja Sandaruwan'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is the help you need.',
    title: 'Help',
    name: 'Suraja Sandaruwan'
  })
}) 

// app.get('', (req, res) => {
//   // res.send('Hello express!')
//   res.send('<h1>Weather</h1>') // HTML response
// })

// app.get('/help', (req, res) => {
//   // res.send('Help page')
//   res.send([{             // Json respond
//     name: 'Suraja',
//     age: 23
//   },
//   {
//     name: 'Dinuja',
//     age: 24
//   }])
// })

// app.get('/about', (req, res) => {
//   res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
  if (!req.query.address) ({
        return res.send({
            error: 'You must provide a location'
        })
  
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
      return res.send({
      error: 'You must provide a search terms'
    })
  }


  console.log(req.query)
  res.send({
    product: []
  })
})

// app.get('/help/*', (req, res) => {
//   res.send('Help aricle not found')
// })

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Suraja Sandaruwan',
    errorMessage: 'Help article not found.'
  })
})

// app.get('*', (req, res) => {
//   res.send('My 404 page!')
// })

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Suraja Sandaruwan',
    errorMessage: 'Page not found.'
  })
})

// This is a stativ value use in a computer
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})