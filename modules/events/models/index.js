const DBService = require('@common/services/db.common.service.js');

class EventModel {
  constructor() {
    this.table = 'event';
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
}

module.exports = EventModel;
