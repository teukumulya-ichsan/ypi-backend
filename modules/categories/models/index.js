const DBService = require('@common/services/db.common.service.js');

class CategoryModel {
  constructor() {
    this.cate_berita = 'berita_kategori';
    this.cate_event = 'event_kategori';
    this.dbService = new DBService();
  }

  async indexBerita(search, sortBy = 'id', order = 'ASC') {
    let query = `SELECT * from ${this.cate_berita}`;

    if (search) {
      query += ` AND nama LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }

  async indexEvent(search, sortBy = 'id', order = 'ASC') {
    let query = `SELECT * from ${this.cate_event}`;

    if (search) {
      query += ` AND nama LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }

  async getCateBeritaById(id) {
    const query = `SELECT * from ${this.cate_berita} where id=?`;

    return await this.dbService.query(query, id);
  }

  async createCateBerita(data) {
    const query = `INSERT into ${this.cate_berita} SET ?`;

    return await this.dbService.query(query, data);
  }
}

module.exports = CategoryModel;
