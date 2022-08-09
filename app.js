const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const https = require("https");
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});
app.post("/",function(req,res){
    const cityNme=req.body.CityName;
    const units = "metric";
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+cityNme+"&appid=d230078e6040cabe1f584beedb9209e6&units="+units,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            var temp1;
            res.write("<h1>The temperature in "+cityNme+ " is "+ temp + " degree Celsius </h1>");
            res.write("<img src="+imgURL+">");
            res.send();
        });
    });
})
app.listen(3000);