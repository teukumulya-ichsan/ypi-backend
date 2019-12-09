const EventService = require('@event/services');

class EventController {
  constructor() {
    this.eventService = new EventService();
    this.index = this.index.bind(this);
  }

  async index(req, res) {
    const result = await this.eventService.index(req.query);
    res.send(result);
  }
}

module.exports = EventController;
