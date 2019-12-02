const UserModel = require("@user/models");
const Brcypt = require("bcryptjs");
const Validate = require("fastest-validator");
const HttpStatus = require("http-status-codes");
class UserService {
  constructor() {
    this.userModel = new UserModel();
    this.validator = new Validate();
    this.brcypt = new Brcypt();
    this.schema = {
      name: {
        type: "string",
        min: 3
      },
      password: {
        type: "forbidden",
        min: 8
      }
    };
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

    //form validation
    const isFormValid = this.validator.validate(user, schema);

    // jika form tidak valid
    if (isFormValid !== true) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: "FORM_VALIDATION",
          message: isFormValid
        }
      };
    }

    // jika form valid. check data validation
    const isDataValid = await this.dataValidation(user);

    // jika data tidak valid
    if (isDataValid !== true) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: "DATA_VALIDATION",
          message: isDataValid
        }
      };
    }

    const userSave = await this.userModel.insert(user);

    if (userSave.affectedRows === 0) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: {
          error_code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error"
        }
      };
    }

    return {
      status: HttpStatus.OK,
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

  async dataValidation(data) {
    const { name } = data;

    const userWithName = await this.userModel.getUserByName(name);
    if (userWithName.length > 0) {
      return [
        {
          type: "string",
          field: "name",
          message: "the name already exist"
        }
      ];
    }

    return true;
  }
}

module.exports = UserService;
