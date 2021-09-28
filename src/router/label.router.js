const Router = require('koa-router')

const { verifyAuth } = require('../middleware/login.middleware')
const { create, list } = require('../controller/label.controller.js')

const labelRouter = new Router({prefix: '/label'})
//创建标签接口
labelRouter.post('/', verifyAuth, create)
//获取标签接口
labelRouter.get('/', list)
module.exports = labelRouter