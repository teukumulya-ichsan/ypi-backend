const UserController = require("@user/controllers");

module.exports = app => {
  const userController = new UserController();

  app.route("/user").get(userController.index);

  app.route("/user:id").get(userController.getById);
};
