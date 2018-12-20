const express = require('express')
const router = express.Router()

const devRoutes = require('./dev')
const prodRoutes = require('./prod') // The routes for production Mode

const fs = require('fs')
const path = require('path')

const { responseHandler } = require('../lib/response')

/**
 * 读取记录路由的json文件
 * read routes from .json file which located in routers/prod/
 * @return {object}
**/
function getRouterTable () {
    const routerTable = {
        public: [],
        authorized: []
    }
    // 遍历routes/prod下的json文件 合并成路由表
    const routerPath = path.resolve(__dirname, './prod/')

    fs.readdirSync(routerPath).forEach((fileName) => {
        if (path.extname(fileName) === '.json'){
            const routerPath = path.resolve(__dirname, `./prod/${fileName}`)
            const routerContent = require(routerPath)

            routerTable.public.push(...routerContent.public)
            routerTable.authorized.push(...routerContent.authorized)
        }
    })

    return routerTable
}

function checkAuth (req, res, next){
    //
    next()
}

/**
 * 把 req, res 传到 handler
 * pass (req, res) to your controllers
 * @param {func} handler
 * @return {object}
**/
const routerTable = getRouterTable()

routerTable.authorized.forEach(r => {
    const method = r.method.toLowerCase()
    const handlerPath = path.resolve(__dirname, `../controllers/${r.location}`)
    const handlerName = r.handler
    const handler = require(handlerPath)[handlerName]

    router[method](`${r.path}`, checkAuth, responseHandler(handler))
    console.info(`[load authorized router]:${method} - ${r.path}`)
})

routerTable.public.forEach(r => {
    const method = r.method.toLowerCase()
    const handlerPath = path.resolve(__dirname, `../controllers/${r.location}`)
    const handlerName = r.handler
    const handler = require(handlerPath)[handlerName]

    router[method](`${r.path}`,  responseHandler(handler))
    console.info(`[load public router]: "${method} - ${r.path}`)
})

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
