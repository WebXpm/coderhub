const fs = require('fs')

const fileService = require('../service/file.service')
const momentService = require('../service/moment.service')

const { PICTURE_PATH } = require('../constants/file-path')

class MomentController {
    async create(ctx, next){
        //1.获取数据
        const userId = ctx.user.id
        const content = ctx.request.body.content

        //2.将数据插入数据库
        const result = await momentService.create(userId, content)
        ctx.body = result
        
    }

    async detail(ctx, next){
        //1.获取数据（momentId）
        const momentId = ctx.params.momentId
        // //2.根据momentId去查询数据
        const result = await momentService.getMomentByID(momentId)
        ctx.body = result
        // ctx.body = '查询数据'
    }

    async list(ctx, next){
        //1.获取参数
        const {page, size} = ctx.query
        //2.查询数据
        const result = await momentService.getMomentList(page, size)

        ctx.body = result
    }

    async update(ctx, next){
        const {momentId} = ctx.params
        const {content} = ctx.request.body
        const result = await momentService.update(content, momentId)
     
        ctx.body = result
    }

    async remove(ctx, next){
        //1.获取参数
        const {momentId} = ctx.params
        // console.log(momentId)
        //2.数据删除
        const result = await momentService.remove(momentId)

        ctx.body = result
    }

    async addLabels(ctx, next){
        
        //1.获取参数
        const {labels} = ctx
        const {momentId} = ctx.params
        //2.给动态添加所有标签
        for(let label of labels){
            //2.1判断label和moment是否已经有关
            console.log(label)
            const isExists = await momentService.hasLabel(momentId, label.id)

            if(!isExists){
                await momentService.addLabel(momentId, label.id)
            }
        }
        
        ctx.body = '给动态添加标签成功~~~'
    }

    async fileInfo(ctx, next){
        //获取文件名
        const { filename } = ctx.params
       
        //数据库查询
        const fileInfo = await fileService.getPictureByFilename(filename)

        ctx.response.set('content-type', fileInfo.mimetype)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}

module.exports = new MomentController()