'use strict'
let configObj
const devConfig = require('./env.dev')
const prodConfig = require('./env.prod')

if (process.env.NODE_ENV !== 'production') {
    configObj = devConfig
} else {
    configObj = prodConfig
}

module.exports = configObj
