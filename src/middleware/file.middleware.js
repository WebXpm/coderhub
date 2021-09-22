const Multer = require('koa-multer')

const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')

const avatarUpload = Multer({
    dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar')

const pictureUpload = Multer({
    dest: PICTURE_PATH
})
const pictureHandler = pictureUpload.array('picture',9) //第一个参数为上存时的字段，第二个参数为最大上存数量

module.exports = {
    avatarHandler,
    pictureHandler
}