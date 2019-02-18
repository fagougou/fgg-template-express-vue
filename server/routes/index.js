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
function getRouteTable () {
    const routeTable = []
    // 遍历routes/prod下的json文件 合并成路由表
    const routePath = path.resolve(__dirname, './prod/')

    fs.readdirSync(routePath).forEach((fileName) => {
        if (path.extname(fileName) === '.json'){
            const routePath = path.resolve(__dirname, `./prod/${fileName}`)
            const routeContent = require(routePath)
            const location = routeContent.location

            routeContent.public.forEach(r => {
                r.location = location
                r.isAuthorized = false
                routeTable.push(r)
            })

            routeContent.authorized.forEach(r => {
                r.location = location
                r.isAuthorized = true
                routeTable.push(r)
            })
        }
    })

    return routeTable
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
const routeTable = getRouteTable()

loadRoutes(routeTable)

/**
 * 加载路由
 * @param {object} table - 记录路由信息的对象
 * @param {array} table.routes - 路由数组
 * @param {string} table.routes.method - 路由方法 get post put delete
 * @param {string} table.routes.path - 路由地址
 * @param {string} table.routes.handler - 路由的处理方法
 * @param {string} table.routes.description - 路由的介绍
 * @param {boolean} table.routes.boolean - 是否公开
**/
function loadRoutes (routeTable){

    routeTable.forEach(r => {
        const handlerPath = path.resolve(__dirname, `../controllers/${r.location}`)
        const method = r.method.toLowerCase()
        const handlerName = r.handler
        const handler = require(handlerPath)[handlerName]

        if (r.isAuthorized){
            router[method](`${r.path}`, checkAuth, responseHandler(handler))
            console.info(`[load authorized router]:${method} - ${r.path}`)
        } else {

            router[method](`${r.path}`, responseHandler(handler))
            console.info(`[load authorized router]:${method} - ${r.path}`)
        }
    })

}

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
