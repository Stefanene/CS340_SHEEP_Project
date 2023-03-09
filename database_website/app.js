// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
PORT        = 4224;                 // Set a port number at the top so it's easy to change in the future

var db = require('./database/db-connector');  //Database
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query1 = "SELECT * FROM Sneakers;";               // Define our query
        let query2 = "SELECT name FROM Sneakers;";

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            let sneakerData = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                // Save the planets
                let sneakers = rows;
                return res.render('index', {data: sneakerData, sneakers: sneakers}); // Render the index.hbs file, and also send the renderer
            })   
        })                 
    });                                         // requesting the web site.

app.post('/addSneakerForm', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Sneakers (name, price) VALUES ('${data.name}', '${data.price}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Sneakers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
})

app.delete('/deleteSneakerButton', function(req,res,next){
    let data = req.body;
    let productID = parseInt(data.id);
    let deleteSneakerToLocation = `DELETE FROM SneakerToLocations WHERE productID = ?`;
    let deleteSneaker= `DELETE FROM Sneakers WHERE productID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteSneakerToLocation, [productID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteSneaker, [productID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
})});

  app.put('/updateSneakerAjax', function(req,res,next){
    let data = req.body;
  
    let sneakerID = parseInt(data.productID);
    let sneakerPrice = parseInt(data.price);
  
    let queryUpdatePrice = `UPDATE Sneakers SET price = '${sneakerPrice}' WHERE productID = '${sneakerID}'`;
    let selectSneaker = `SELECT * FROM Sneakers WHERE productID = '${sneakerID}'`
  
          // Run the 1st query
          db.pool.query(queryUpdatePrice, function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectSneaker, function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
})});
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

