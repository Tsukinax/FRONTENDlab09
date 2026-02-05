// 1. เรียกใช้งาน express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    var bmi = weight / (height * height);


    res.send("The result of the BMI calculation is " + bmi);
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});