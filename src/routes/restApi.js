import config from '../config'
import jwt from 'jsonwebtoken'
import Chalk from 'chalk'

module.exports = (app, r) => {
  app.route('/player/token').post((req, res) => {
    if (!req.body.player_name) {
      return res.status(401).json({
        message: 'Invalid player name!'
      })
    } else {
      let token = jwt.sign(
        {
          name: req.body.player_name,
          time_stamp: new Date()
        },
        '100_thai_flag_game'
      )
      return res.status(200).json({
        token: token
      })
    }
  })

  app
    .route('/player/score')
    .get((req, res) => {
      r
        .table(config.rethinkdb.table)
        .orderBy(r.desc('score'))
        .limit(10)
        .run(app._rdbConn, (err, cursor) => {
          if (err) console.log(Chalk.bgRed(err))
          else {
            cursor.toArray((err, result) => {
              if (err) console.log(Chalk.bgRed(err))
              else {
                return res.status(200).json({
                  score_list: result
                })
              }
            })
          }
        })
    })
    .post((req, res) => {
      if (!req.body.score) {
        return res.status(400).json({
          message: "Invalid player's score!"
        })
      } else {
        try {
          let decoded = jwt.verify(req.body.token, '100_thai_flag_game')
          const recordedDate = new Date()
          let data = {
            name: decoded.name,
            score: parseInt(req.body.score),
            createdAt: recordedDate
          }
          r
            .table(config.rethinkdb.table)
            .insert(data)
            .run(app._rdbConn, (err, result) => {
              if (err) console.log(Chalk.bgRed(err))
              else {
                r
                  .table(config.rethinkdb.table)
                  .orderBy(r.desc('score'))
                  .run(app._rdbConn, (err, cursor) => {
                    if (err) console.log(Chalk.bgRed(err))
                    else {
                      cursor.toArray((err, scoreList) => {
                        if (err) console.log(Chalk.bgRed(err))
                        else {
                          let rank =
                            scoreList.findIndex(
                              player =>
                                player['createdAt'].valueOf() ===
                                recordedDate.valueOf()
                            ) + 1
                          return res.status(201).json({
                            message: 'Create score successful.',
                            ranking: rank
                          })
                        }
                      })
                    }
                  })
              }
            })
        } catch (err) {
          return res.status(401).json({
            message: 'You are not suppose to be here <3'
          })
        }
      }
    })

  app.use(handleError)
  app.use(handle404)
}

const handle404 = (req, res, next) => {
  return res.status(404).end('Not found')
}

const handleError = (err, req, res, next) => {
  console.log(Chalk.bgRed(err.stack))
  return res.status(500).json({err: err.message})
}
