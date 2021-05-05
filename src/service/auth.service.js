const connection = require('../app/database')

class AuthService {
  async checkMoment(id,userId) {
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`
    const result = await connection.execute(statement,[id,userId])
    return result[0].length === 0? false : true
  }
  
}
module.exports = new AuthService()