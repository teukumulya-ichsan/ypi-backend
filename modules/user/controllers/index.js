const UserService = require("@user/services");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.index = this.index.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.detele = this.delete.bind(this);
    this.fullDelete = this.fullDelete.bind(this);
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

  async insert(req, res) {
    const saveUser = await this.userService.insert(req.body);

    res.status(saveUser.status);

    if (saveUser.status === 200) {
      res.send({
        data: saveUser
      });
    }

    res.send({
      error: saveUser.error
    });
  }

  async update(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    const updateUser = await this.userService.update(userId, userData);

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

  async delete(req, res) {
    const userId = req.params.id;

    const deleteUser = await this.userService.delete(userId);

    res.status(deleteUser.status);
    if (deleteUser.status === 200) {
      res.send({
        data: deleteUser.data
      });
    }

    res.send({
      message: deleteUser.message
    });
  }

  async fullDelete(req, res) {
    const userId = req.params.id;

    const deleteUser = await this.userService.fullDelete(userId);

    res.status(deleteUser.status);
    if (deleteUser.status === 200) {
      res.send({
        data: deleteUser.data
      });
    }

    res.send({
      message: deleteUser.message
    });
  }
}

module.exports = UserController;
