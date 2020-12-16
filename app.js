const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

  res.send("Server is up and running.");

  const url = "https://samples.openweathermap.org/data/2.5/weather?q=London&appid=e55b1a04e700b51cad3db52b540d2196?units=metric#";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
    })
  });
});

app.listen(3000, function(){
  console.log("Serever is running on port 3000.");
});
