var promise = require('bluebird');
var options = { promiseLib: promise };
var connectionString = "postgres://dba:Nottingham13@localhost:5432/testdb"
var pgp = require('pg-promise')(options);
var db = pgp(connectionString);

// function getUsers(req, res){
//     client.query('SELECT * FROM public."Users"', (err, res) => {
//         if (err) throw err;
//         for (let row of res.rows){
//             return(res);
//         }
//         client.end();
//     })
// }

function getUsers(req, res, next) {
    db.any('SELECT * FROM public."Users"')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            message: 'Retrieved all Users',
            users: data
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  function getUsers(req, res, next) {
    db.any('SELECT * FROM public."Users"')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            message: 'Retrieved all Users',
            users: data
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  function getNotifications(req, res, next) {
      db.any('SELECT * FROM public."Notifications" WHERE "UserID" = $1 ORDER BY "NotificationID" ASC', [0])
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            message: 'Retrieved all Notifications',
            Notifications: data
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

// function getUsers(req, res){
//     client.query('SELECT * FROM public."Users"').then(function(data){
//         res.status(200).json({
//             status: 'success',
//             data: data,
//             message: 'Retrieved all Users'
//         });
//     }).catch(function(err){
//         return (err);
//     });
// }

module.exports = {
    getUsers: getUsers,
    getNotifications: getNotifications
};