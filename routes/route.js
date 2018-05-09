// app/routes.js

// var db = require('../config/db.js');
// var url = 'mongodb://localhost:27017/';
// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect(url, function(err,db){

// });


var express = require('express');
var router = express.Router();
var Users = require('../app/models/users');
var Notifications = require('../app/models/notifications');

// router.get('*', (req, res)=>{
//     res.sendfile('./public/views/index.html');
// });

// router.get('/users', (req, res, next)=>{
//    res.send('routetested');
// });

router.get('/users', function(req, res) {
            // use mongoose to get all users in the database
            Users.find(function(err, users) {
                if (err) {
                    res.send(err);
                }
                else{
                    res.json(users); // return all users in JSON format
                }
                
            });
        });

router.get('/notifications', function(req, res){
    Notifications.find(function(err, users){
        if(err){
            res.send(err);
        }
        else{
            res.json(users);
        }
    })
})

router.post('/user', (req, res)=>{
    let newUser = new Users({
        "userName": req.body.hello
    });
    newUser.save((err, newUser)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json({msg: 'Item has been added successfully'});
        }
    })
});

router.patch('/notification/:id', (req, res)=>{
    
})

//  router.get('/users', (req, res, next)=>{
//  });

//  router.get('/users', (req, res, next)=>{
//  });

module.exports = router;

    // module.exports = function(app) {

    //     // server routes ===========================================================
    //     // handle things like api calls
    //     // authentication routes

    //     // sample api route
    //     app.get('/users', function(req, res) {
    //         // use mongoose to get all users in the database
    //         Users.find(function(err, users) {
    //             if (err) {
    //                 res.send(err);
    //             }
    //             else{
    //                 res.json(users); // return all users in JSON format
    //             }
                
    //         });
    //     });

    //     app.post("/user", function(req, res) {
    //         let newUser = new Users({
    //             userName: req.body.userName
    //         })
    //     });
        
    //     /*  "/api/contacts/:id"
    //      *    GET: find contact by id
    //      *    PUT: update contact by id
    //      *    DELETE: deletes contact by id
    //      */
        
    //     app.get("/user/:id", function(req, res) {
    //     });
        
    //     app.put("/user/:id", function(req, res) {
    //     });
        
    //     app.delete("/user/:id", function(req, res) {
    //     });

    //     // route to handle creating goes here (app.post)
    //     // route to handle delete goes here (app.delete)

    //     // frontend routes =========================================================
    //     // route to handle all angular requests
    //     app.get('*', function(req, res) {
    //         res.sendfile('./public/views/index.html'); // load our public/index.html file
    //     });

    // };

  