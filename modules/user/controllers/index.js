const UserService = require("@user/services");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.index = this.index.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async index(req, res) {
    res.send({
      data: await this.userService.index()
    });
  }

  async getById(req, res) {
    res.send({
      data: await this.userService.getById(req.params.id)
    });
  }

  async create(req, res) {
    const saveUser = await this.userService.createUser(req.body);

    if (saveUser.status !== 200) {
      res.status(500);
      res.send({
        message: "Internal Server Error"
      });
    }

    res.status(200);
    res.send({
      data: saveUser
    });
  }

  async update(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    console.log(userId, userData);
    const updateUser = await this.userService.updateUser(userId, userData);

    res.status(updateUser.status);
    if (updateUser.status === 200) {
      res.send({
        data: updateUser.data
      });
    }

    res.send({
      message: updateUser.message
    });
  }
}

module.exports = UserController;
