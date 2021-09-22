const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config() //调用此方法，能再process.env中生成.env中配置的变量
// console.log(process.env.APP_PORT)   //输出 3000
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/public.key'))

module.exports = {
    APP_HOST,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_user,
    MYSQL_PASSWORD
} = process.env //解构

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY