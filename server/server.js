/*

 To start this server:

 1) Instal npm packages: "$ sudo npm install"
 2) Execute in the cmd line: "node server.js"

*/

var express = require("express");
var app = express();

app.use((req, res, next) => {
    console.log("2! req.url:", req.url );
    next();
});

app.get("/data", function(req, res) {
    console.log("data! \n");
    res.sendFile( __dirname + '/data/data.json');
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