const PostModel = require("@post/models");
const Validate = require("fastest-validator");
const HttpStatus = require("http-status-codes");
class PostService {
  constructor() {
    this.postModel = new PostModel();
    this.validator = new Validate();
    this.schema = {
      title: {
        type: "string",
        min: 3
      },
      post_type: {
        type: "string",
        enum: ["post", "pages"]
      }
    };
  }

  async index() {
    return await this.postModel.index();
  }

  async create(data) {
    const post = {
      title: data.title,
      post_type: data.post_type,
      content: data.content
    };

    const isFormValid = this.validator.validate(post, schema);

    if (isFormValid !== true) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: "FORM_VALIDATION",
          message: isFormValid
        }
      };
    }

    const postSave = await this.postModel.create(post);

    if (postSave.affectedRows === 0) {
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
      data: "Post saved"
    };
  }
}

module.exports = PostService;
