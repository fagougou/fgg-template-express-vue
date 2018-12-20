const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const users = require('./routes/users')

const app = express()

const ERROR_CODE = require('./error_code.json')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found')

    err.code = '10002'
    next(err)
})

// error handler
app.use(function (err, req, res, next) {
    const DEFAULT_ERRORCODE = '40001'
    const code = err.code || DEFAULT_ERRORCODE
    const targetError = ERROR_CODE[code]

    // set locals, only providing error in development

    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    console.error('error info:', err)
    // render the error page
    res.status(targetError.statusCode || 500)
        .json({
            code: code,
            message: err.message ||targetError.message
        })
})

module.exports = app
