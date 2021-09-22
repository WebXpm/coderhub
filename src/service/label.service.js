const connection = require('../app/database')

class LabelService {
    async create(name){
        console.log(name)
        const statement = `INSERT INTO label (name)  VALUES  (?)`
        const [result] = await connection.execute(statement, [name])
        return result
    }

    async getLabelByName(name){
        const statement = `SELECT * FROM label WHERE name = ?`
        const [result] = await connection.execute(statement, [name])
        return result[0]
    }
    
    async getLabels(page, size){
        const statement =  `SELECT * FROM label LIMIT ?, ?`
        const [result] = await connection.execute(statement, [page, size])
        return result
    }

  
} 

module.exports = new LabelService()