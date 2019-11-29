const UserModel = require("@user/models");
const brcypt = require("bcryptjs");

class UserService {
  constructor() {
    this.userModel = new UserModel();
  }

  async index() {
    return await this.userModel.index();
  }

  async getById(id) {
    const data = await this.userModel.getById(id);

    if (data.length > 0) {
      return data;
    }

    return "Data Empty";
  }

  async insert(data) {
    const user = {
      name: data.name,
      password: await brcypt.hash(data.password, 10)
    };

    const userSave = await this.userModel.insert(user);

    if (userSave.affectedRows === 0) {
      return {
        status: 500
      };
    }

    return {
      status: 200,
      data: "data saved"
    };
  }

  async update(userId, userData) {
    if (!userId) {
      return {
        status: 400,
        message: "userId is required!"
      };
    }

    const data = {};

    if (userData.name) {
      data.name = userData.name;
    }

    if (userData.password) {
      data.password = userData.password;
    }

    const updateUser = await this.userModel.update(userId, data);
    if (updateUser.affectedRows !== 1) {
      return {
        status: 500,
        message: "Internal Server Error"
      };
    }

    return {
      status: 200,
      data: "Data Updated"
    };
  }

  async delete(userId) {
    if (!userId) {
      return {
        status: 400,
        message: "user id required"
      };
    }

    const data = {
      is_deleted: 1
    };

    const deletedUser = await this.userModel.update(userId, data);
    if (deletedUser.affectedRows !== 1) {
      return {
        status: 500,
        message: "Internal Server Error"
      };
    }

    return {
      status: 200,
      data: "data updated"
    };
  }

  async fullDelete(userId) {
    if (!userId) {
      return {
        status: 400,
        message: "userId is required!"
      };
    }

    const deletedUser = await this.userModel.fullDelete(userId);
    if (deletedUser.affectedRows !== 1) {
      return {
        status: 500,
        message: "Internal Server Error"
      };
    }

    return {
      status: 200,
      data: "Data Updated"
    };
  }
}

module.exports = UserService;
