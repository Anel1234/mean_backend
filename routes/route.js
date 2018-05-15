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

// router.get('/notifications', function(req, res){
//     Notifications.find(function(err, users){
//         if(err){
//             res.send(err);
//         }
//         else{
//             res.json(users);
//         }
//     })
// })

router.post('/user', (req, res)=>{
    let newUser = new Users({
        "userName": req.body.userName
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

router.delete('/user/:id', (req, res, err) => {
    let id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // let user = Users.findById(id, function(err, obj) {
        //     if (err) throw err;
        //     return obj;
        // });

        // let user = function getuserName(id) {
        //     var query = Users.findById(id);
        //     return query;
        // }

        Users.findByIdAndRemove(id, function(err, obj) {
            if (err) throw err;
            if (!obj) {
                res.send('Did not match a UserID in the database');
            } else {
                res.send('User ' + id + ' has been deleted from the database');
            }
        })
    }
    else throw "This is not a valid ID"
})

router.patch('/user/:id', (req, res, err) => {
    let id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Users.findByIdAndUpdate(id, {$set:{userName:req.userName}}, function(err, obj) {
            if (obj) { 
                if (err) {
                    res.send(err);
                } else {
                    res.send('User ' + id + ' has been updated')
                }
            }
            else {
                res.send('Did not match a UserID in the database')
            }
        })
    }
})

router.patch('/image/:id', (req, res, err) => {
    let id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // Users.findByIdAndUpdate(id, {$push:{images:{ data: "nottest", contentType: "image/png" }}}, function(err, obj) {
        Users.findByIdAndUpdate(id, {$push:{images: req.body.images}}, function(err, obj) {
            if (obj) {
                if (err) {
                    res.send(err);
                } else {
                    res.send('Image has been added')
                }
            }
            else {
                res.send ('Did not match a UserID in the database')
            }
        })
    }
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

  