const Router = require('koa-router')
const { verifyAuth, 
        verifyPermission 
} = require('../middleware/login.middleware')
const { create, 
        detail, 
        list, 
        update, 
        remove, 
        addLabels,
        fileInfo 
} = require('../controller/moment.controller') 
const {
    verifyLabelExists
} = require('../middleware/label.middleware.js')

const momentRouter = new Router({prefix: '/moment'})

//发表动态接口
momentRouter.post('/', verifyAuth, create)
//获取动态列表：单个和全部
momentRouter.get('/:momentId', detail)
momentRouter.get('/', list)

//1.用户是否登录  2.用户是否具备修改的权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission("moment","id"), update)
//删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission("moment","id"), remove)

//动态添加标签接口
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission("moment","id"), verifyLabelExists,  addLabels)


//获取动态配图
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter