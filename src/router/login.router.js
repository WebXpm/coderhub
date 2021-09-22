const Router = require('koa-router')

const {
    login,
    success
} = require('../controller/login.controller')
const { 
    verifyLogin,
    verifyAuth 
} = require('../middleware/login.middleware')

const loginRouter = new Router({prefix: '/login'})
//登录接口
loginRouter.post('/', verifyLogin, login)
loginRouter.get('/',verifyAuth, success)

module.exports = loginRouter