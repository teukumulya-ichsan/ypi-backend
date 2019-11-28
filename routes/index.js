const userRoute = require("@user/routes");

module.exports = app => {
  app.route("/").get((req, res) => {
    res.send("Started from Here!!");
  });

  userRoute(app);
};
