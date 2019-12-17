const UserModel = require('@user/models');
const brcypt = require('bcryptjs');
const Validate = require('fastest-validator');
const HttpStatus = require('http-status-codes');
class UserService {
  constructor() {
    this.userModel = new UserModel();
    this.validator = new Validate();
    this.schema = {
      name: {
        type: 'string',
        min: 3
      },
      password: {
        type: 'string',
        min: 8
      },
      email: {
        type: 'email'
      },
      mobile_phone: {
        type: 'string',
        min: 10,
        max: 12,
        numeric: true
      }
    };
  }

  async index() {
    return await this.userModel.index();
  }

  async create(data) {
    const user = {
      name: data.name,
      email: data.email,
      password: await brcypt.hash(data.password, 10),
      mobile_phone: data.mobile_phone,
      photo_url: data.photo_url
    };

    // user.password = await brcypt.hash(data.password, 10);

    const isFormValid = await this.validator.validate(user, this.schema);
    if (isFormValid === true) {
      // console.log(user);
      const isDataValid = await this.dataValidation(user);

      if (isDataValid !== true) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: {
            error_code: 'DATA_VALIDATION',
            message: isDataValid
          }
        };
      } else {
        const userSaved = await this.userModel.create(user);
        if (userSaved.affectedRows === 0) {
          return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: {
              error_code: 'INTERNAL_SERVER_ERROR',
              message: 'Internal Server Error'
            }
          };
        }

        return {
          status: HttpStatus.OK,
          message: 'User Created'
        };
      }
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: 'FORM_VALIDATION',
          message: isFormValid
        }
      };
    }
  }

  async dataValidation(data) {
    const { email, mobile_phone } = data;

    const userWithEmail = await this.userModel.getUserByEmail(email);
    // console.log(userWithEmail);
    if (userWithEmail.length > 0) {
      return [
        {
          type: 'string',
          field: 'email',
          message: 'email user already exist'
        }
      ];
    }

    const userWithPhone = await this.userModel.getUserByPhone(mobile_phone);

    if (userWithPhone.length > 0) {
      return [
        {
          type: 'number',
          field: 'mobile_phone',
          message: 'Phone Number already used'
        }
      ];
    }

    return true;
  }
}

module.exports = UserService;
