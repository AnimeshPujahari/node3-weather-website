const request = require('request');

const forecast = (latitude , longitude , callback) => {

    const url = "http://api.weatherstack.com/current?access_key=d7fadb46ba27ac858313b8e1a9c9ef5e&query="+latitude+","+longitude;

    request(
        { url : url , json : true},
        (error , response) => {

            if(error){
                callback('Unable to connect to weather services' , undefined);
            }else if(response.body.error){
                callback(response.body.error.info , undefined);
            }else{

                const data = {
                    temperature : response.body.current.temperature,
                    describe: response.body.current.weather_descriptions
                }

                callback(undefined , data.describe + " sky" + "It is currently " + data.temperature + " degrees out.");
            }
        }
    )
}



module.exports = {forecast};