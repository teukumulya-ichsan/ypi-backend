const EventController = require("@event/controllers");

module.exports = app => {
  const eventController = new EventController();

  app.route("/events").get(eventController.index);
};
