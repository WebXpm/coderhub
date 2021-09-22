const connection = require('../app/database')
class UserService {
    async create(user){
        //将user存储到数据库中
        console.log('把user数据保存到数据库中',user);
        const {name, password} = user
        
        const statement = 'INSERT INTO user (name, password) VALUES (?,?);'
        const result = await connection.execute(statement, [name, password])
    
        return result[0]
    }

    async getUserByName(name){
        const statement = 'SELECT * FROM user WHERE NAME = ?;'
        const result = await connection.execute(statement, [name])

        return result[0]
    }

    async updateAvatarUrlById(avatarUrl, id){
        const statement = `UPDATE user set avatar_url = ? WHERE id = ?`
        const [result] = await connection.execute(statement, [avatarUrl, id])
        return result
    }
}

module.exports = new UserService()