const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode.js')
const forecast = require('./utils/forecast.js');

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', ( req, res ) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ashton Naidoo'
    });
})

app.get('/about', ( req, res ) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashton Naidoo'
    })
})

app.get('/help', ( req, res ) => {
    res.render('help', {
        message: 'How can we help you?',
        title: 'Help',
        name: 'Ashton Naidoo'
    })
})

//weather
app.get('/weather', ( req, res ) => {

    if(!req.query.address){
        return res.send({
            error: 'address is required'
        })      
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
               return res.send({ error })
            }

            res.send({
                location: location,
                address: req.query.address,
                forecast: forecastData
            })
        })
})

})


app.get('/products', ( req, res ) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', ( req, res ) => {
    res.render('error', {
        title: 'Help Page Error',
        error: 'Help article not found',
        name: 'Ashton Naidoo'
    })
})

app.get('*', ( req, res ) => {
        res.render('error', {
            title: '404 error',
            error: 'Page not found :(',
            name: 'Ashton Naidoo'
        })
})

app.listen(3000, () => {
    console.log('server is running on 3000');
})