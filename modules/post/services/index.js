const PostModel = require("@post/models");

class PostService {
  constructor() {
    this.postModel = new PostModel();
  }

  async index() {
    return await this.postModel.index();
  }
}
