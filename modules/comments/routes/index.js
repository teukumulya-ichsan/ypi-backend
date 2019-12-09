const CommentController = require('@comments/controllers');

module.exports = app => {
  const commentController = new CommentController();

  app.route('/comment-berita').get(commentController.indexBerita);

  app.route('/comment-event').get(commentController.indexEvent);
};
