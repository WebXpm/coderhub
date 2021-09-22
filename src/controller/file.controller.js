const fs = require('fs')

const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/file-path')
const { APP_HOST, APP_PORT } = require('../app/config')
class FileController {

    async saveAvatar(ctx, next) {
        //1.获取头像相关信息
        const { filename, mimetype, size } = ctx.req.file
        const { id } = ctx.user
        //2.把信息保存到数据库中
        const result = await fileService.createAvatar(filename, mimetype, size, id)
        const avatarUrl = `http://${APP_HOST}:${APP_PORT}/upload/${id}/avatar`
        await userService.updateAvatarUrlById(avatarUrl, id)
        ctx.body = '上存头像成功'
    }

    async avatar(ctx, next) {
        const { userId } = ctx.params

        const avatarInfo = await fileService.getAvatarByUserId(userId)
        //对数据库查询到的数据进行处理
        ctx.response.set('content-type', avatarInfo.mimetype)  //设置返回类型，否则浏览器试别为文件自动下载
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
    }

    async savePicture(ctx, next) {
        const files = ctx.req.files
        const { id } = ctx.user
        const { momentId } = ctx.query
        // console.log(files, id, momentId)
        for (let file of files) {
            const { filename, mimetype, size } = file
            await fileService.createPicture(filename, mimetype, size, id, momentId)
        }
        ctx.body = '上存动态图片成功'
    }


}

module.exports = new FileController()