const DBService = require("@common/services/db.common.service.js");

class UserModel {
  constructor() {
    this.table = "users";
    this.dbService = new DBService();
  }

  async index() {
    const query = `SELECT * from ${this.table}`;
    return await this.dbService.query(query);
  }

  async getById(id) {
    const query = `SELECT * from users where id=?`;
    return await this.dbService.query(query, id);
  }

  async insert(data) {
    const query = `INSERT into ${this.table} SET ?`;
    const result = await this.dbService.query(query, data);
    return result;
  }

  async update(userId, data) {
    const query = `UPDATE ${this.table}
                   SET ? 
                   WHERE id=?`;

    const result = await this.dbService.query(query, [data, userId]);
    return result;
  }
}

module.exports = UserModel;
