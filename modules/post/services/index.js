const PostModel = require("@post/models");

class PostService {
  constructor() {
    this.postModel = new PostModel();
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

    const postSave = await this.postModel.create(post);

    if (postSave.affectedRows === 0) {
      return {
        status: 500
      };
    }

    return {
      status: 200,
      message: "Post Saved"
    };
  }
}

module.exports = PostService;
