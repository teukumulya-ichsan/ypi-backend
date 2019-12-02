const PostController = require("@post/controllers");

module.exports = app => {
  const postController = new PostController();

  app
    .route("/post")
    .get(postController.index)
    .post(postController.create);
};
