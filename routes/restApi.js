const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = function(app) {
  app.route('/player/token')
    .post(function(req, res) {
      let cert = fs.readFileSync('private.key');
      let token = jwt.sign(
        {
          name: req.body.player_name,
          time_stamp: new Date()
        },
        cert,
        { algorithm: 'RS256'}
      );
    });

  app.route('/player/score')
    .post(function(req, res) {
      let cert = fs.readFileSync('public.pem');
      jwt.verify(req.body.token, cert, { algorithm: ['RS256'] },function(err, decoded) {
        //TODO: decoded.name to get player name, and insert to database
      })
    })
};
