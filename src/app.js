const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname , '../public');
const viewDirectoryPath = path.join(__dirname , '../templates/views');
const partialDirectoryPath = path.join(__dirname , '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewDirectoryPath);
hbs.registerPartials(partialDirectoryPath);


//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('' , (req, res) => {
    res.render('index' , {
        title: 'Weather',
        name: 'Animesh'
    });
});

app.get('/about' , (req, res) => {
    res.render('about' , {
        title: 'About me',
        name: 'Animesh Pujahari'
    })
});

app.get('/help' , (req , res) => {
    res.render('help' , {
        message: 'How can we change the password',
        title: 'help',
        name: 'Animesh'
    })
});

app.get('/weather' , (req , res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'The address is not provided'
        });
    }

    geocode.geoCoding(req.query.address,(error,{latitude , longitude , location} = {}) => {
        if(error){
            return res.send({error});
        }
    
        forecast.forecast(latitude , longitude , (error , forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecast : forecastData,
                address: req.query.address,
                location
            });
        });
    })

})

app.get('/products' , (req , res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send(
        {
            products: []
        }
    )
})

app.get('/help/*' , (req , res) => {
    res.render('404page' , {
        errormessage: 'Help article not found',
        name: 'Animesh'
    })
})

app.get('*' , (req , res) => {
    res.render('404page' , {
        errormessage: 'Error 404',
        name: 'Animesh'
    })
})


app.listen(port, () => {
    console.log('Server is running..');
});
