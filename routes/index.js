const userRoute = require('@user/routes');
const postRoute = require('@post/routes');
const eventRoute = require('@event/routes');
const categoryRoute = require('@categories/routes');
const commentsRoute = require('@comments/routes');
const likesRoute = require('@likes/routes');

module.exports = app => {
  app.route('/').get((req, res) => {
    res.send('Started from Here!!');
  });

  userRoute(app);
  postRoute(app);
  eventRoute(app);
  categoryRoute(app);
  commentsRoute(app);
  likesRoute(app);
};
