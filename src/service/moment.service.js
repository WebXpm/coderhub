const connection = require('../app/database')

class MomentService {
    async create(userId, content) {
        const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?)`
        const [result] = await connection.execute(statement, [content, userId])
        return result
    }
    
    async getMomentByID(id){
        
        // const statement = `
        //     SELECT
        //         m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        //         author
        //     FROM moment m 
        //     LEFT JOIN user u ON m.user_id = u.id
        //     WHERE m.id = ?
        // `
    //    const statement = 'SELECT * FROM moment LEFT JOIN user ON user_id = user.id WHERE moment.id = ?'
        const statement = `SELECT * FROM moment LEFT JOIN user ON user_id = user.id LEFT JOIN file ON file.moment_id = moment.id  WHERE moment.id = ?`
        const [result] = await connection.execute(statement, [id])
        console.log(result)
        return result
    }

    async getMomentList(page, size){
        const statement = `SELECT *,(SELECT COUNT(*) FROM comment c WHERE c.moment_id = moment.id ) commentCount FROM moment LEFT JOIN user ON user_id = user.id LIMIT ?, ?`
        const [result] = await connection.execute(statement, [page, size])
        console.log(result);
        return result
    }

    async update(content, momentId){
        const statement = `UPDATE moment SET content = ? WHERE id = ?`
        const [result] = await connection.execute(statement, [content, momentId])
        return result
    }

    async remove(momentId){
        const statement = `DELETE FROM moment WHERE id = ?`
        const [result] = await connection.execute(statement, [momentId])
        return result
    }

    async hasLabel(momentId, labelId){
        const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result[0]
    }

    async addLabel(momentId, labelId){
        const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)`
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result
    }
}

module.exports = new MomentService()