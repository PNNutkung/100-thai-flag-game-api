const config = require('../config');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function(app, r) {
  app.route('/player/token')
    .post(function(req, res) {
      if(!req.body.player_name) {
        return res.status(403).json(
          {
            message: 'Invalid player name!'
          }
        );
      }
      else {
        let token = jwt.sign(
          {
            name: req.body.player_name,
            time_stamp: new Date()
          },
          '100_thai_flag_game'
        );
        return res.status(200).json(
          {
            token: token
          }
        );
      }
    });

  app.route('/player/score')
    .get(function(req, res) {
      return res.json({
        message: 'Test!'
      })
    })
    .post(function(req, res) {
      try {
        let decoded = jwt.verify(req.body.token, '100_thai_flag_game');
        //TODO: decoded.name to get player name, and insert to database
        console.log(decoded.name);
        console.log(decoded.time_stamp);
        return res.status(200).json({
          message: 'Successful!'
        });
      } catch (err) {
        return res.status(203).json({
          message: 'You are suppose to be here <3'
        });
      }
    });

    app.use(handleError);
    app.use(handle404);
};

const handle404 = function(req, res, next) {
  return res.status(404).end('Not found');
}

const handleError = function(err, req, res, next) {
  console.log(err.stack);
  return res.status(500).json({err: err.message});
}
