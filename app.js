const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "e55b1a04e700b51cad3db52b540d2196";
    // const apiKey = "e72ca729af228beabd5d20e3b7749713";
    const unit = "metric";
    const url = "https://samples.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"?units="+ unit +"#";

    https.get(url, function(response) {
      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

        res.write("<p>The weather is currently " + weatherDescription + "</p>")
        res.write("<h1>The temperature in "+ req.body.cityName +" is " + temp + " degrees Celcius</h1>")
        res.write("<img src=" + imageUrl + ">")

        res.send();
      })
    });

});

app.listen(3000, function(){
  console.log("Serever is running on port 3000.");
});
