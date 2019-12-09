const EventModel = require('@event/models');

class EventService {
  constructor() {
    this.eventModel = new EventModel();
  }

  async index(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;

    const eventData = await this.eventModel.index(search, sortBy, order);

    return {
      data: eventData
    };
  }
}

module.exports = EventService;
