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
        min: 3
      }
    };
  }

  async index(query) {
    const search = query.q;
    const sortBy = query.sort_by;
    const order = query.order;

    const postData = await this.postModel.index(search, sortBy, order);

    return {
      data: postData
    };
  }

  async create(data) {
    const post = {
      judul: data.judul,
      ringkasan: data.ringkasan,
      konten: data.konten,
      id_kategori: data.id_kategori,
      status: data.status
    };

    // const isFormValid = this.validator.validate(post, schema);

    // if (isFormValid !== true) {
    //   return {
    //     status: HttpStatus.BAD_REQUEST,
    //     error: {
    //       error_code: 'FORM_VALIDATION',
    //       message: isFormValid
    //     }
    //   };
    // }

    const postSave = await this.postModel.create(post);

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
      data: 'Post saved'
    };
  }

  async update(postId, postData) {
    if (!postId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'postId is required!'
      };
    }

    // const data = {};

    // if (postData.title) {
    //   data.title = postData.title;
    // }

    // if (postData.post_type) {
    //   data.post_type = postData.post_type;
    // }

    // if (postData.content) {
    //   data.content = postData.content;
    // }

    const updatePost = await this.postModel.update(postId, postData);
    if (updatePost.affectedRows !== 1) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'internal server error'
      };
    }

    return {
      status: HttpStatus.OK,
      data: 'Post Updated'
    };
  }

  async delete(postId) {
    if (!postId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'postId is required'
      };
    }

    const deletedPosts = await this.postModel.delete(postId);

    if (deletedPosts.affectedRows !== 1) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error'
      };
    }

    return {
      status: HttpStatus.OK,
      data: 'Post Deleted'
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
