const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/login.middleware')
const { create, reply, update, remove, list } = require('../controller/comment.controller.js')

const commentRouter = new Router({prefix: '/comment'})

//发表评论
commentRouter.post('/', verifyAuth, create)
//评论回复
commentRouter.post('/:commentId/reply', verifyAuth, reply)
//修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission("comment","id"), update)
//删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission("comment","id"), remove)

//获取评论列表
commentRouter.get('/', list)

module.exports = commentRouter