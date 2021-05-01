const request = require('request');

const geoCoding = (geocodeAddress , callback) => {

    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ geocodeAddress +".json?access_token=pk.eyJ1IjoiYW5pbWVzaC1wdWphaGFyaSIsImEiOiJja281bmVvdHkwNjgwMzBsdGFicTZhMzJ0In0.8Jo_x7qge9NI5PUG3wI3Dw&limit=1"
    
    request(
        { url : geocodeURL , json : true} ,
        (error , response) => {

            if(error){
                callback('Unable to connect to loaction services', undefined);
            }else if(response.body.features.length === 0){
                callback('Invalid input', undefined);
            }else{

                const data = {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                }

                callback(undefined , data);
            }
        }
    )

}

module.exports = {geoCoding};