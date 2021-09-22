const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
    let status, message

    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400  //bad request
            message = '用户名或者密码不能为空'
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409  //conflict
            message = '用户已存在~'
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400  //bad request
            message = '用户名不存在~'
            break;
        case errorTypes.PASSWORD_NOT_INCORRENT:
            status = 400  //bad request
            message = '密码错误~'
            break;
        case errorTypes.UNAUTHORIZATION:
            status = 401  //no anthorization
            message = '无效token~'
            break;
        case errorTypes.UNPERMISSION:
            status = 401  //no anthorization
            message = '您没有权限进行操作~'
            break;
        default:
            status = 404
            message = 'NOT FOUND'
            break;
    }
    ctx.status = status
    ctx.body = message
}

module.exports = errorHandler