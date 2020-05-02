const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

console.log(__dirname)
console.log(__filename)

// set up paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up hbs as view engine
app.set('view engine', 'hbs')
// set up view directory path
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// set up static directory
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'The Index',
        author: 'Sachin'
    })
})

app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'About',
        author: 'Sachin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        preface: 'The book is for all',
        helpText: 'The Help for weather',
        author: 'Sachin'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'Please provide the address'})
    }

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
                address: req.query.address,
                location
            })
        })
    })

    // res.send({
    //     forecast: 'The Cool',
    //     temprature: '40 degree celcius',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({error: 'Please provide a search term'})
    }

    res.send({products: []})
})

app.get('/help/*', (req, res) => {
    res.render('404-error', {errorText: 'Help article not found', author: 'Sachin'})
})

app.get('*', (req, res) => {
    res.render('404-error', {errorText: 'Page not found', author: 'Sachin'})
})

app.listen(3000, () => {
    console.log('Webserver is started at port 3000')
})