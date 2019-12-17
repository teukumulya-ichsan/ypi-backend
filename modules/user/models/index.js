const DBService = require('@common/services/db.common.service.js');

class UserModel {
  constructor() {
    this.table = 'user';
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

  async getUserByEmail(email) {
    const query = `SELECT user_id from ${this.table} where email=?`;

    return await this.dbService.query(query, email);
  }

  async getUserByPhone(mobile_phone) {
    const query = `SELECT user_id from ${this.table} where mobile_phone=?`;

    return await this.dbService.query(query, mobile_phone);
  }

  async create(data) {
    console.log(data);
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

  async fullDelete(id) {
    const query = `DELETE from ${this.table} where id=?`;
    return await this.dbService.query(query, id);
  }
}

module.exports = UserModel;
