const app = require('./app/index')
// require('./app/database')

const config = require('./app/config')

app.listen(config.APP_PORT, () => {
    console.log(`服务器在${config.APP_PORT}端口启动成功`)//模板字符串写法：ES6
    // console.log('服务器在'+ config.APP_PORT +'启动成功')
})