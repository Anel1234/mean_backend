var express = require('express');
var mongoose = require('mongoose');
const pg = require('pg');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
const route = require('./routes/route');
//const queries = require ('./queries.js');

var db = require('./config/db.js');
// var connectionString = "postgres://dba:Nottingham13@localhost:5432/testdb"
// var client = new pg.Client(connectionString);
// client.connect();

// var x = 0;
// while(x < 10){
//     client.query('INSERT INTO public."Users" values($1, $2)', [x, 'Anel']);
//     x++
// }

var port = process.env.port || 8080;

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)

// mongoose.connection.on('connected',()=>{
//     console.log('Connected to MongoDB at port 27017')
// });

// mongoose.connection.on('error',(err)=>{
//     console.log(err)
// });

// mongoose.connect('mongodb://localhost:27017/local');

// function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('success');
//     }
// }); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/public'));


// app.get('*', (req, res)=>{
//     res.sendfile('./public/views/index.html');
// });

app.use('/api', route);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

// require('./routes/route')(app);

app.listen(port);
console.log('Magic happens on port ' + port);

//exports = module.exports = app;

module.exports = app;