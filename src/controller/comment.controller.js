const commentService = require('../service/comment.service.js')
class CommentController{
    async create(ctx, next){
        //1.获取数据库查询需要的参数
        const {content, momentId} = ctx.request.body
        const {id} = ctx.user
        console.log(content,momentId, id)
        //2.数据库查询
        const result = await commentService.create(content, momentId, id)
        ctx.body = result
    }

    async reply(ctx, next){
        const {content, momentId} = ctx.request.body
        const {commentId} = ctx.params
        const {id} = ctx.user
    
        const result = await commentService.reply(content, momentId, commentId, id)
        ctx.body = result
    }

    async update(ctx, next){
        const {commentId} = ctx.params
        const {content} = ctx.request.body
        const result = await commentService.update(commentId, content)
        ctx.body = result

    }

    async remove(ctx, next){
        const {commentId} = ctx.params
        const result = await commentService.remove(commentId)

        ctx.body = result
    }

    async list(ctx, next){
        const {momentId} = ctx.query
        const result = await commentService.getCommentByMomentId(momentId)
        ctx.body = result
    }

}

module.exports = new CommentController()