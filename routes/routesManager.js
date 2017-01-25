const async = require('async');
const config = require('../config');
const r = require('rethinkdb');

module.exports = function(app, express) {
  app.use(handle404);
  app.use(handleError);

  async.waterfall([
    function connect(callback) {
      r.connect(config.rethinkdb, callback);
    },
    function createDatabase(connection, callback) {
      r.dbList().contains(config.rethink.db).do(function(containsDb) {
        return r.branch(
          containsDb,
          {created: 0},
          r.dbCreate(config.rethinkdb.db)
        );
      }).run(connection, function(err) {
        callback(err, connection);
      });
    },
  ], function(err, connection) {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
  });
}

const handle404 = function(req, res, next) {
  res.status(404).end('Not found');
}

const handleError(err, req, res, next) {
  console.log(err.stack);
  res.status(500).json({err: err.message});
}
