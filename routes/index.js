const userRoute = require("@user/routes");
const postRoute = require("@post/routes");

module.exports = app => {
  app.route("/").get((req, res) => {
    res.send("Started from Here!!");
  });

  userRoute(app);
  postRoute(app);
};
