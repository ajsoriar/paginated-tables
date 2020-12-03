/*

 To start this server:

 1) Instal npm packages: "$ sudo npm install"
 2) Execute in the cmd line: "node server.js"

*/

var express = require("express");
var app = express();

app.use((req, res, next) => {
    console.log("2! req.url:", req.url );
    res.header('Access-Control-Allow-Origin', '*');
    setTimeout(()=>{
        next();           
    },2000)  
});

app.get("/data", function(req, res) {
    console.log("data! \n");
    res.sendFile( __dirname + '/data/data.json'); 
});

app.get("/pictures", function(req, res) {
    console.log("pictures! \n");
    res.sendFile( __dirname + '/data/pictures.json'); 
});

// ------------------------------------------------------
// SERVER INIT
// ------------------------------------------------------

app.listen(9003, function() { 
    console.log("Listening on 9003");
});

// ------------------------------------------------------
// SERVER INIT
// ------------------------------------------------------