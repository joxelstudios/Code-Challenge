// Dependencies
var express = require("express");
var mongojs = require("mongojs");

// Initialize Express
var app = express();

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = process.env.MONGODB_URI || "poolpros";
var collections = ["dealers"];
const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/dealers", function(req, res) {
  // Query: In our database, go to the dealers collection, then "find" everything
  db.dealers.find({}, function(err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

app.get("/dealers/:certs", function(req, res) {
  let cert = req.params.certs;
  let matches = [];
  
  // Query: In our database, go to the dealers collection, then "find" everything
  db.dealers.find({}, function(err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      found[0].dealers.forEach(element => {
        
        if(element.data.certifications.indexOf(cert) > -1){
          console.log(`check!`);          
          matches.push(element);
        };
              
        
      });
    }
    res.json(matches);
  });
});


app.listen(PORT, function () {
  console.log("App running on" + PORT);
});
