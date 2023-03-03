// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 4224;                 // Set a port number at the top so it's easy to change in the future
var db = require('./database/db-connector');  //Database
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/
app.get('/', function(req, res) {
        
    //Sneaker / index page
    let query1 = "SELECT * FROM Sneakers;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
    });   
});


app.get('/locations', function(req, res) {

    //StoreLocations page
        
    let queryL1 = "SELECT * FROM StoreLocations;";
    db.pool.query(queryL1, function(errorL, rowsL, fieldsL){    // Execute the query
        res.render('locations', {data: rowsL});                  // Render the index.hbs file, and also send the renderer
    });   

});


app.get('/customers', function(req, res) {

    //Customers page
        
    let queryL1 = "SELECT * FROM Customers;";
    db.pool.query(queryL1, function(errorC, rowsC, fieldsC){    // Execute the query
        res.render('customers', {data: rowsC});                  // Render the index.hbs file, and also send the renderer
    });   

});


app.get('/employees', function(req, res) {

    //Employees page
        
    let queryL1 = "SELECT * FROM Employees;";
    db.pool.query(queryL1, function(errorE, rowsE, fieldsE){    // Execute the query
        res.render('employees', {data: rowsE});                  // Render the index.hbs file, and also send the renderer
    });   

});


app.get('/shoefinder', function(req, res) {

    //SneakerToLocations page
        
    let queryL1 = "SELECT * FROM SneakerToLocations;";
    db.pool.query(queryL1, function(errorSL, rowsSL, fieldsSL){    // Execute the query
        res.render('shoefinder', {data: rowsSL});                  // Render the index.hbs file, and also send the renderer
    });   

});


app.get('/sales', function(req, res) {

    //Sales page
        
    let queryL1 = "SELECT * FROM Sales;";
    db.pool.query(queryL1, function(errorS, rowsS, fieldsS){    // Execute the query
        res.render('sales', {data: rowsS});                  // Render the index.hbs file, and also send the renderer
    });   

});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

