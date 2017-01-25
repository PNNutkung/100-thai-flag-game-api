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
      r.table(config.rethinkdb.table)
        .orderBy(r.desc('score'))
        .limit(10)
        .run(app._rdbConn, function(err, cursor) {
        if (err) throw err;
        else cursor.toArray(function(err, result) {
          if(err) throw err;
          else
            return res.status(200).json({
              score_list: result
            });
        });
      });
    })
    .post(function(req, res) {
      if(!req.body.score)
        return res.status(400).json({
          message: 'Invalid player\'s score!'
        });
      else {
        try {
          let decoded = jwt.verify(req.body.token, '100_thai_flag_game');
          let data = {
            name: decoded.name,
            score: req.body.score,
            createdAt: new Date()
          };
          r.table(config.rethinkdb.table)
            .insert(data)
            .run(app._rdbConn, function(err, result) {
              if (err) throw err;
              else
                return res.status(201).json({ message: 'Create score successful.' });
            });
        } catch (err) {
          return res.status(203).json({
            message: 'You are not suppose to be here <3'
          });
        }
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
