const connection = require('../app/database')

class AuthSercive{
    //闭包的形式
    async checkResource(tableName, checkId, id, userId){  
        try{
            const statement = `SELECT * FROM ${tableName} WHERE ${checkId} = ? AND user_id = ?`
            const [result] = await connection.execute(statement, [id, userId])
            return result.length === 0 ? false : true 
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new AuthSercive()