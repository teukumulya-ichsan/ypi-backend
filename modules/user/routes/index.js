const UserController = require("@user/controllers");

module.exports = app => {
  const userController = new UserController();

  app
    .route("/user")
    .get(userController.index)
    .post(userController.insert);

  app
    .route("/user/:id")
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.fullDelete);
};
