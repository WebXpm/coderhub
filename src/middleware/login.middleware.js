const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')


const verifyLogin = async (ctx, next) => {
    const {name, password} = ctx.request.body
  
    //1.判断用户名密码是否为空
    if(!name || !password ){
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error',error, ctx);
    }
 
    //2.判断用户名是否存在
    const result = await userService.getUserByName(name)
    const user = result[0]
    if(!result.length){
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)  //记得return
    }


    //3.判断密码是否正确
    if(md5password(password) !== user.password){
        const error = new Error(errorTypes.PASSWORD_NOT_INCORRENT)
        return ctx.app.emit('error', error, ctx)
    }
    
    ctx.user = user

    await next()
}

//判断授权
const verifyAuth = async (ctx, next) => {
    console.log("验证授权的middleware")

    //1.获取token
    const authorization = ctx.header.authorization
    if(!authorization){
        const error = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
    const token = authorization.replace('Bearer ', '')
    //2.验证token
    try{
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.user = result
        await next()
    }catch(err){
        console.log(err)
        const error = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
}

//验证权限
const verifyPermission = (tableName, checkId) => {
    return async (ctx, next) => {
        console.log('验证权限的middleware~')
        //1.获取参数
        const [resourceKey] = Object.keys(ctx.params)
        const resourceId = ctx.params[resourceKey]
        console.log(resourceId);
        const {id} = ctx.user
       
        //2.查询数据库数据，确定是否有修改的权限
        try{
            const isPermission = await authService.checkResource(tableName, checkId, resourceId, id)
            // console.log(isPermission)
            if(!isPermission) throw new Error()
            await next()
        }catch(err){
            const error = new Error(errorTypes.UNPERMISSION)
            return ctx.app.emit('error', error, ctx)
        } 
       
    }
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}