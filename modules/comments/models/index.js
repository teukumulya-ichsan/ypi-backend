const DBService = require('@common/services/db.common.service.js');

class CommentModel {
  constructor() {
    this.comment_berita = 'berita_komentar';
    this.comment_event = 'event_komentar';
    this.dbService = new DBService();
  }

  async indexBerita(search, sortBy = 'id', order = 'ASC') {
    let query = `SELECT * from ${this.comment_berita}`;

    if (search) {
      query += ` AND komentar LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }

  async indexEvent(search, sortBy = 'id', order = 'ASC') {
    let query = `SELECT * from ${this.comment_event}`;

    if (search) {
      query += ` AND komentar LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }
}

module.exports = CommentModel;
