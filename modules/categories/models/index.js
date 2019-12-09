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
}

module.exports = CategoryModel;