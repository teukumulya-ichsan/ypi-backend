const PostController = require('@post/controllers');

module.exports = app => {
  const postController = new PostController();

  app
    .route('/post')
    .get(postController.index)
    .post(postController.create);

  app
    .route('/post/:id')
    .get(postController.getPostDetail)
    .put(postController.update)
    .delete(postController.delete);
};
