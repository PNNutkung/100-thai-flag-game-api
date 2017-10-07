import async from 'async'
import config from '../config'
import r from 'rethinkdb'
import Chalk from 'chalk'

module.exports = (app, express) => {
  function startExpress (connection){
    let apiRoutes = express.Router()
    apiRoutes._rdbConn = connection
    app.use('/api', apiRoutes)
    require('./restApi')(apiRoutes, r)
    app.listen(config.express.port)
    console.log(Chalk.green('100 Thai Flag Game API online!'))
  }

  async.waterfall(
    [
      function connect (callback){
        r.connect(config.rethinkdb, callback)
      },
      function createDatabase (connection, callback){
        r
          .dbList()
          .contains(config.rethinkdb.db)
          .do(containsDb => {
            return r.branch(
              containsDb,
              {created: 0},
              r.dbCreate(config.rethinkdb.db)
            )
          })
          .run(connection, err => {
            callback(err, connection)
          })
      },
      function createTable (connection, callback){
        r
          .tableList()
          .contains(config.rethinkdb.table)
          .do(containsTable => {
            return r.branch(
              containsTable,
              {create: 0},
              r.tableCreate(config.rethinkdb.table)
            )
          })
          .run(connection, err => {
            callback(err, connection)
          })
      },
      function createIndex (connection, callback){
        r
          .table(config.rethinkdb.table)
          .indexList()
          .contains('score')
          .do(hasIndex => {
            return r.branch(
              hasIndex,
              {create: 0},
              r.table(config.rethinkdb.table).indexCreate('score')
            )
          })
          .run(connection, err => {
            callback(err, connection)
          })
      },
      function waitForIndex (connection, callback){
        r
          .table(config.rethinkdb.table)
          .indexWait('score')
          .run(connection, (err, result) => {
            callback(err, connection)
          })
      }
    ],
    (err, connection) => {
      if (err) {
        console.log(Chalk.bgMagenta(err))
        process.exit(1)
      }

      startExpress(connection)
    }
  )
}
