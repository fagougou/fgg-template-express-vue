const express = require('express')
const router = express.Router()

const devRoutes = require('./dev')
// const mockRoutes = require('./mock')
const prodRoutes = require('./prod') // The routes for production Mode

// Define the different Routers for dev and dev:mock
if (process.env.NODE_ENV !== 'production') {
    console.info('start: DEV mode')
    router.use(devRoutes)
    router.use(prodRoutes)
} else {
    router.use(prodRoutes)
}

router.get('/robots.txt', function (req, res) {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
})

module.exports = router