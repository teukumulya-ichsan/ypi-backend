const DBService = require('@common/services/db.common.service.js');

class PostModel {
  constructor() {
    this.table = 'berita';
    this.dbService = new DBService();
  }

  async index(search, sortBy = 'id', order = 'ASC') {
    let query = `SELECT * from ${this.table}`;

    if (search) {
      query += ` AND judul LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }

  async create(data) {
    const query = `INSERT into ${this.table} SET ?`;
    const result = await this.dbService.query(query, data);

    return result;
  }

  async update(postId, data) {
    const query = `UPDATE ${this.table}
                   SET ?
                   WHERE id=?`;

    const result = await this.dbService.query(query, [data, postId]);

    return result;
  }

  async delete(id) {
    const query = `DELETE from ${this.table} where id=?`;

    return await this.dbService.query(query, id);
  }

  async getById(id) {
    const query = `SELECT * from ${this.table} where id=?`;

    return await this.dbService.query(query, id);
  }
}

module.exports = PostModel;
