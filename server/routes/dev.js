/*
 *  This routes is only for dev mode.
 */

const express = require('express')
const router = express.Router()
const request = require('request')
const devConfig = require('../config/env.dev')


/* GET home page. */
router.get('/', function (req, res, next) {
    return request(
        `http://${devConfig.client.host}:${devConfig.client.port}`
    ).pipe(res)
})





module.exports = router
