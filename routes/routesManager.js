const async = require('async');
const config = require('../config');
const r = require('rethinkdb');

module.exports = function(app, express) {
  function startExpress(connection) {
    app._rdbConn = connection;
    require('./restApi')(app, r);
    app.listen(config.express.port);
    console.log('100 Thai Flag Game API online!');
  }

  async.waterfall([
    function connect(callback) {
      r.connect(config.rethinkdb, callback);
    },
    function createDatabase(connection, callback) {
      r.dbList().contains(config.rethinkdb.db).do(function(containsDb) {
        return r.branch(
          containsDb,
          {created: 0},
          r.dbCreate(config.rethinkdb.db)
        );
      }).run(connection, function(err) {
        callback(err, connection);
      });
    },
    function createTable(connection, callback) {
      r.tableList().contains(config.rethinkdb.table).do(function(containsTable) {
        return r.branch(
          containsTable,
          {create: 0},
          r.tableCreate(config.rethinkdb.table)
        );
      }).run(connection, function(err) {
        callback(err, connection);
      });
    },
    function createIndex(connection, callback) {
      r.table(config.rethinkdb.table).indexList().contains('createdAt').do(function(hasIndex) {
        return r.branch(
          hasIndex,
          {create: 0},
          r.table(config.rethinkdb.table).indexCreate('createdAt')
        );
      }).run(connection, function(err) {
        callback(err, connection);
      });
    },
    function waitForIndex(connection, callback) {
      r.table(config.rethinkdb.table).indexWait('createdAt').run(connection, function(err, result) {
        callback(err, connection);
      });
    }
  ], function(err, connection) {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }

    startExpress(connection);
  });
}
