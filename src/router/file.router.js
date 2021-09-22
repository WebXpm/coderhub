const Router = require("koa-router");


const { verifyAuth } = require("../middleware/login.middleware");
const { avatarHandler, pictureHandler } = require('../middleware/file.middleware')
const { saveAvatar, avatar, savePicture } = require('../controller/file.controller')


const fileRouter = new Router({ prefix: "/upload" })
//上存头像
fileRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatar)
//获取头像
fileRouter.get('/:userId/avatar', avatar)

//动态配图
fileRouter.post('/picture', verifyAuth, pictureHandler, savePicture)
module.exports = fileRouter