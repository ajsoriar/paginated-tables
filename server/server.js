/*

 To start this server:

 1) Instal npm packages: "$ sudo npm install"
 2) Execute in the cmd line: "node server.js"

*/

var express = require("express");
var Utils = require("./utils.js");
var fs = require('fs');
var app = express();

app.use((req, res, next) => {
    console.log("2! req.url:", req.url );
    res.header('Access-Control-Allow-Origin', '*');
    setTimeout(()=>{
        next();           
    },1000)  
});

app.get("/data", function(req, res) {
    console.log("data! \n");
    res.sendFile( __dirname + '/data/data.json'); 
});

// app.get("/pictures", function(req, res) {
//     console.log("pictures! \n");
//     res.sendFile( __dirname + '/data/pictures.json'); 
// });

const getRowsFromData = ( data, page, maxRows ) => {
    var arr = [];
    var startRow = page * maxRows;
    var endRow = startRow + maxRows;
    if ( endRow > data.length ) endRow = data.length;
    for ( var i = startRow; i < endRow; i++ ) arr.push( data[i] );
    return arr
}

app.get( "/pictures", function(req, res) { // Examples: http://localhost:9003/pictures?page=0 OR http://localhost:9003/pictures?page=0&rows=1

    var urlParams = Utils.getParamsAsObject(req.url);
    console.log("urlParams:", urlParams );

    var page = 0;
    var rows = 2;

    if (urlParams.page) page = urlParams.page;
    if (urlParams.rows) rows = urlParams.rows;

    console.log("page:", page );
    console.log("rows:", rows );

    // open file
    var obj = JSON.parse(fs.readFileSync(__dirname + '/data/pictures.json', 'utf8'));

    // get desired items
    var response = {data: getRowsFromData( obj.data, page, rows ) };

    // close
    res.json( response );
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