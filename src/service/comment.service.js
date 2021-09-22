const connection = require('../app/database')

class CommentService {
    async create(content, momentId, id){
        const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?)`
        const result = await connection.execute(statement, [content, momentId, id])
        return result
    }

    async reply(content, momentId, commentId, id){
        const statement = `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?)`
        const result = await connection.execute(statement, [content, momentId, id, commentId])
        return result
    }

    async update(commentId, content){
        const statement = `UPDATE comment SET content = ? WHERE id = ?`
        const result = await connection.execute(statement, [content, commentId])
        return result
    }

    async remove(commentId){
        const statement = `DELETE FROM comment WHERE id = ? `
        const result = await connection.execute(statement, [commentId])
        return result
    }

    async getCommentByMomentId(momentId){
        const statement = 'SELECT * FROM comment LEFT JOIN user ON user_id = user.id WHERE moment_id = ?'
        const [result] = await connection.execute(statement, [momentId])
        return result
    }
}

module.exports = new CommentService()