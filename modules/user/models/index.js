const DBService = require("@common/services/db.common.service.js");

class UserModel {
  constructor() {
    this.table = "backend-ypi";
    this.dbService = new DBService();
  }

  async index() {
    const query = `select * from users`;
    return await this.dbService.query(query);
  }

  async getById(id) {
    const query = `select * from users where id=?`;
    return await this.dbService.query(query, id);
  }

  // model function to insert data
  async insert(data) {
    const sql = `INSERT into ${this.table} SET ?`;
    const result = await this.db.query(sql, data);
    return result;
  }

  async update(userId, data) {
    const sql = `UPDATE ${this.table} 
    SET ?
    WHERE id=?`;

    const result = await this.db.query(sql, [data, userId]);

    return result;
  }
}

module.exports = UserModel;
