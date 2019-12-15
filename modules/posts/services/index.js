const PostModel = require('@post/models');
const Validate = require('fastest-validator');
const HttpStatus = require('http-status-codes');
class PostService {
  constructor() {
    this.postModel = new PostModel();
    this.validator = new Validate();
    this.schema = {
      judul: {
        type: 'string',
        min: 5,
        max: 255
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'INACTIVE'],
        optional: true
      },
      id_kategori: {
        type: 'number'
      }
    };
  }

  async index(query) {
    const search = query.q;
    const sortBy = query.sort_by;
    const order = query.order;
    const status = query.status;
    const is_deleted = query.deleted;

    const postData = await this.postModel.index(
      search,
      sortBy,
      order,
      status,
      is_deleted
    );

    return {
      data: postData
    };
  }

  async create(data) {
    const isFormValid = this.validator.validate(data, this.schema);

    if (isFormValid !== true) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: 'FORM_VALIDATION',
          message: isFormValid
        }
      };
    }

    const postSave = await this.postModel.create(data);

    if (postSave.affectedRows === 0) {
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
      message: 'Post saved'
    };
  }

  async update(postId, postData) {
    if (!postId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'postId is required!'
      };
    }

    console.log(postData);

    const updatePost = await this.postModel.update(postId, postData);
    if (updatePost.affectedRows !== 1) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'internal server error'
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Post Updated'
    };
  }

  async delete(postId) {
    const existsID = await this.postModel.getById(postId);

    if (existsID.length > 0) {
      const deletedPosts = await this.postModel.delete(postId);
      if (deletedPosts.affectedRows !== 1) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error'
        };
      }

      return {
        status: HttpStatus.OK,
        message: 'Post Deleted'
      };
    }

    return {
      status: HttpStatus.BAD_REQUEST,
      error: {
        error_code: 'BAD_REQUEST',
        message: 'Unknown ID'
      }
    };
  }

  async getById(postId) {
    const data = await this.postModel.getById(postId);

    if (data.length > 0) {
      return {
        status: HttpStatus.OK,
        data: data[0]
      };
    }

    return {
      status: HttpStatus.NO_CONTENT,
      message: 'Data Empty'
    };
  }
}

module.exports = PostService;
