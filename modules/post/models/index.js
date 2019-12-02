const DBService = require("@common/services/db.common.service.js");

class PostModel {
  constructor() {
    this.table = "posts";
    this.dbService = new DBService();
  }

  async index() {
    const query = `SELECT * from ${this.table}`;
    return await this.dbService.query(query);
  }

  async create(data) {
    const query = `INSERT into ${this.table} SET ?`;
    const result = await this.dbService.query(query, data);

    return result;
  }
}

module.exports = PostModel;
