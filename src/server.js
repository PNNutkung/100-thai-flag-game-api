import FileStreamRotator from 'file-stream-rotator'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
const app = express()
const logDirectory = path.join(__dirname, 'log')

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, project_id, Authorization, o-Requested-With'
  )
  next()
})
app.use(morgan('combined', {stream: accessLogStream}))

require('./routes/routesManager')(app, express)
